import { defineManifest } from '@crxjs/vite-plugin'
import pkg from './package.json'

export default defineManifest({
  manifest_version: 3,
  name: 'Founder Mode',
  description: 'A Chrome extension to block distracting websites and help you stay focused.',
  version: pkg.version,
  icons: {
    16: 'public/icon16.png',
    32: 'public/icon32.png',
    48: 'public/icon48.png',
    128: 'public/icon128.png',
  },
  action: {
    default_icon: {
      16: 'public/icon16.png',
      32: 'public/icon32.png',
      48: 'public/icon48.png',
      128: 'public/icon128.png',
    },
    default_popup: 'src/popup/index.html',
  },
  permissions: [
    'storage',
    'declarativeNetRequest',
    'webNavigation',
    'scripting',
  ],
  host_permissions: ['<all_urls>'],
  background: {
    service_worker: 'src/background/main.ts',
    type: 'module' as const,
  },
  options_ui: {
    page: 'src/options/index.html',
    open_in_tab: true,
  },
  web_accessible_resources: [{
    resources: ['src/blocked/index.html'],
    matches: ['<all_urls>'],
  }],
})
