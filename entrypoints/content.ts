export default defineContentScript({
  matches: ['*://*.google.com/*', '*://*.youtube.com/*'],
  main() {
    console.log('Hello content.');
  },
});
