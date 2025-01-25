export default defineContentScript({
  matches: ['*://*.youtube.com/*'],
  main(ctx) {
    console.log('Hello content.');
    const ui = createIntegratedUi(ctx, {
      position: 'inline',
      anchor: 'ytd-item-section-renderer',
      onMount: () => {
        addDivToThumbnails();

        const mutationObserver = new MutationObserver(mutationHandler);

        mutationObserver.observe(document.body, { childList: true, subtree: true });

        const previewContainer = document.querySelector('ytd-video-preview');
        if (previewContainer) {
          const previewObserver = new MutationObserver(previewHandler);
          previewObserver.observe(previewContainer, { childList: true, subtree: true });
        }
      }
    });
    ui.autoMount();

  },
});

let previewUrl: string | null = null;

async function previewHandler(mutations: MutationRecord[]) {
  const previewContainer = document.querySelector('ytd-video-preview');
  if (previewContainer) {
    const href = previewContainer.querySelector('#media-container-link')?.getAttribute('href') ?? null;
    if (href != previewUrl) {
      previewUrl = href;
      console.log(previewUrl);
    }
  }
}

async function mutationHandler(mutations: MutationRecord[]) {
  addDivToThumbnails();
}

function addDivToThumbnails() {
  const thumbnails = document.querySelectorAll('ytd-video-renderer ytd-thumbnail');

  thumbnails.forEach((thumbnail) => {
    if (!thumbnail.querySelector('.custom-div')) {
      const app = document.createElement('div');
      const b = document.createElement('p');
      app.className = 'custom-div';
      app.style.position = 'absolute';
      app.style.top = '0';
      app.style.left = '0';
      b.textContent = 'HERE123456';
      app.style.width = '80px';
      app.style.height = '50px';
      app.style.backgroundColor = 'red';
      app.style.zIndex = '9999';
      app.appendChild(b);
      thumbnail.append(app);
    }
  });
};