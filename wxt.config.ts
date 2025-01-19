import { defineConfig } from 'wxt';

export default defineConfig({
  extensionApi: 'chrome',
  modules: ['@wxt-dev/module-react'],
  manifest: {
    permissions: ['storage'],
  },
  alias: {
    '@': '.'
  }
});
