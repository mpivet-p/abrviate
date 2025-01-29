import { createRoot } from 'react-dom/client';
import { CustomDiv } from '../components/content/button';

export default defineContentScript({
  matches: ['*://*.youtube.com/*'],
  main(ctx) {

    console.log('Content script loaded!');

    const ui = createIntegratedUi(ctx, {
      position: 'inline',
      anchor: 'body',
      onMount: (container) => {
        const root = createRoot(container);
        addDivToThumbnails(root);

        const mutationObserver = new MutationObserver(() => addDivToThumbnails(root));
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

async function previewHandler(root: any) {
  const previewContainer = document.getElementById('media-container');
  if (previewContainer) {
    const href = previewContainer.querySelector('#media-container-link')?.getAttribute('href') ?? null;
    if (href != previewUrl) {
      previewUrl = href;
      if (href && href.startsWith('/watch')) {
        addToThumbnail(previewContainer, root);
      } else {
        removeFromThumbnail(previewContainer);
      }
    }
  }
}

function removeFromThumbnail(thumbnail: Element) {
  const app = thumbnail.querySelector('.custom-div');
  if (app) {
    app.remove();
  }
}

function addToThumbnail(thumbnail: Element, root: any) {
  if (!thumbnail.querySelector('.custom-div')) {
    const container = document.createElement('div');
    container.className = 'custom-div';
    thumbnail.appendChild(container);

    const appRoot = createRoot(container);
    appRoot.render(<CustomDiv />);
  }
}

//ytd-player

function addDivToThumbnails(root: any) {
  const richMediaThumbnails = document.querySelectorAll('ytd-rich-grid-media ytd-thumbnail');
  const renderedThumbnails = document.querySelectorAll('ytd-video-renderer ytd-thumbnail');
  // const suggestedThumbnails = document.querySelectorAll('ytd-watch-next-secondary-results-renderer ytd-thumbnail');

  const thumbnails = [...richMediaThumbnails, ...renderedThumbnails];

  thumbnails.forEach((thumbnail) => {
    addToThumbnail(thumbnail, root);
  });
};
