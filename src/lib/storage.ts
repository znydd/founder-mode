const STORAGE_KEY = 'blockedUrls'

export interface StorageData {
    [STORAGE_KEY]: string[]
}

async function getOrInit(): Promise<string[]> {
    const data = await chrome.storage.sync.get(STORAGE_KEY)
    if (data[STORAGE_KEY] === undefined) {
        await chrome.storage.sync.set({ [STORAGE_KEY]: [] })
        return []
    }
    return data[STORAGE_KEY] as string[]
}

export async function getBlockedUrls(): Promise<StorageData> {
    const urls = await getOrInit()
    return { blockedUrls: urls }
}

export async function setBlockedUrls(url: string): Promise<boolean> {
    try {
        const existing = await getOrInit()
        if (!existing.includes(url)) {
            await chrome.storage.sync.set({ [STORAGE_KEY]: [...existing, url] })
        }
        return true
    } catch {
        return false
    }
}

export async function removeBlockedUrl(url: string): Promise<boolean> {
    try {
        const existing = await getOrInit()
        await chrome.storage.sync.set({ [STORAGE_KEY]: existing.filter(u => u !== url) })
        return true
    } catch {
        return false
    }
}
