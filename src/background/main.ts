import { getBlockedUrls } from '@/lib/storage'

function hashId(url: string): number {
    let hash = 0
    for (let i = 0; i < url.length; i++) {
        hash = ((hash << 5) - hash + url.charCodeAt(i)) | 0
    }
    return Math.abs(hash) || 1
}

function urlToRule(url: string, id: number): chrome.declarativeNetRequest.Rule {
    // Convert pattern like "youtube.com/shorts/*" to a DNR urlFilter
    // DNR urlFilter uses || for domain anchor and * for wildcard
    const urlFilter = `||${url}`

    return {
        id,
        priority: 1,
        action: {
            type: chrome.declarativeNetRequest.RuleActionType.REDIRECT,
            redirect: {
                extensionPath: `/src/blocked/index.html?url=${encodeURIComponent(url)}`,
            },
        },
        condition: {
            urlFilter,
            resourceTypes: [chrome.declarativeNetRequest.ResourceType.MAIN_FRAME],
        },
    }
}

async function syncRules() {
    const { blockedUrls } = await getBlockedUrls()
    const newRules = blockedUrls.map(url => urlToRule(url, hashId(url)))

    // Remove all existing dynamic rules, then add new ones
    const existingRules = await chrome.declarativeNetRequest.getDynamicRules()
    const removeRuleIds = existingRules.map(r => r.id)

    await chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds,
        addRules: newRules,
    })
}

function patternToRegex(pattern: string): RegExp {
    // Convert "youtube.com/shorts/*" to a regex matching the full URL
    const escaped = pattern.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*')
    return new RegExp(`^https?://(www\\.)?${escaped}`)
}

async function checkSpaNavigation(tabId: number, url: string) {
    const { blockedUrls } = await getBlockedUrls()
    for (const pattern of blockedUrls) {
        if (patternToRegex(pattern).test(url)) {
            const blockedPage = chrome.runtime.getURL(`src/blocked/index.html?url=${encodeURIComponent(pattern)}`)
            chrome.tabs.update(tabId, { url: blockedPage })
            return
        }
    }
}

// Sync rules on extension install/update
chrome.runtime.onInstalled.addListener(syncRules)

// Sync rules whenever storage changes
chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'sync' && changes['blockedUrls']) {
        syncRules()
    }
})

// Catch SPA navigations (pushState/replaceState)
chrome.webNavigation.onHistoryStateUpdated.addListener((details) => {
    if (details.frameId === 0) {
        checkSpaNavigation(details.tabId, details.url)
    }
})
