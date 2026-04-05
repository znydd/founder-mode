import { defineManifest } from '@crxjs/vite-plugin'
import pkg from './package.json'

export default defineManifest({
  manifest_version: 3,
  name: pkg.name,
  version: pkg.version,
  icons: {
    48: 'public/logo.png',
  },
  action: {
    default_icon: {
      48: 'public/logo.png',
    },
    default_popup: 'src/popup/index.html',
  },
  permissions: [
    'sidePanel',
    'contentSettings',
    'storage',
    'declarativeNetRequest',
    'webNavigation',
  ],
  host_permissions: ['<all_urls>'],
  background: {
    service_worker: 'src/background/main.ts',
    type: 'module' as const,
  },
  content_scripts: [{
    js: ['src/content/main.tsx'],
    matches: ['https://*/*'],
  }],
  side_panel: {
    default_path: 'src/sidepanel/index.html',
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
