import { createRoot, Root } from 'react-dom/client';
import { AbrviateButton } from '../../components/content/AbrviateButton';
import { Chat } from '@/components/content/Chat';
import { setChatStorage } from '@/lib/utils';
import '@/assets/integratedUi.css';

export default defineContentScript({
  matches: ['*://*.youtube.com/*'],
  main: async (ctx) => {

    console.log('Content script loaded!'); // Debug

    const storedExtStatus = await storage.getItem('local:extStatus')
    if (typeof storedExtStatus === 'boolean' && storedExtStatus === false) {
      return;
    }

    await setChatStorage({
      videoUrl: '',
      chatContent: '',
    });

    await storage.setItem('local:lastBlur', 0);

    const ui = createIntegratedUi(ctx, {
      position: 'inline',
      anchor: 'body',
      onMount: (container) => onBodyMount(container)
    });
    ui.autoMount();

    const secondaryUi = createIntegratedUi(ctx, {
      position: 'inline',
      anchor: 'ytd-video-preview',
      onMount: onPreviewMount
    });
    secondaryUi.autoMount();
  }
});

function onBodyMount(container: HTMLElement) {
  const root: Root = createRoot(container);
  root.render(<Chat />);
  addDivToThumbnails(root);

  const mutationObserver: MutationObserver = new MutationObserver(() => addDivToThumbnails(root));
  mutationObserver.observe(document.body, { childList: true, subtree: true });
}

function onPreviewMount() {
  const previewContainer: Element | null = document.querySelector('ytd-video-preview');

  if (previewContainer) {
    const previewObserver: MutationObserver = new MutationObserver(previewHandler);
    previewObserver.observe(previewContainer, { childList: true, subtree: true });
  }
}

let previewUrl: string | null = null;

async function previewHandler(root: any) {
  const previewContainer: Element | null = document.getElementById('media-container');

  if (previewContainer) {
    const href: string | null = previewContainer.querySelector('#media-container-link')?.getAttribute('href') ?? null;

    if (href !== previewUrl) {
      previewUrl = href;

      if (href && href.startsWith('/watch')) {
        addButtonToThumbnail(previewContainer, root);
      } else {
        removeButtonFromThumbnail(previewContainer);
      }
    }
  }
}

function removeButtonFromThumbnail(thumbnail: Element) {
  const app = thumbnail.querySelector('.abrviate-button');
  if (app) {
    app.remove();
  }
}

function addButtonToThumbnail(thumbnail: Element, root: any) {
  const link: HTMLAnchorElement | null = thumbnail.querySelector('a') as HTMLAnchorElement;

  if (link && !thumbnail.querySelector('.abrviate-button')) {
    const container: HTMLDivElement = document.createElement('div');

    container.className = 'abrviate-button';
    thumbnail.appendChild(container);

    const appRoot: Root = createRoot(container);
    appRoot.render(<AbrviateButton videoUrl={link.href} />);
  }
}

//ytd-player

function addDivToThumbnails(root: any) {
  const richMediaThumbnails = document.querySelectorAll('ytd-rich-grid-media ytd-thumbnail');
  const renderedThumbnails = document.querySelectorAll('ytd-video-renderer ytd-thumbnail');

  const thumbnails = [...richMediaThumbnails, ...renderedThumbnails];

  thumbnails.forEach((thumbnail) => {
    addButtonToThumbnail(thumbnail, root);
  });
};
