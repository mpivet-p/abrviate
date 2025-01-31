import React from 'react';
import { ChatStorage, getChatStorage, setChatStorage } from '@/lib/utils';

const resetChatPosition = (chat: HTMLElement, buttonPosition: { top: number, left: number }) => {
      // Get the scroll position of the window
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
      const trueTop = buttonPosition.top + scrollTop;
      const trueLeft = buttonPosition.left + scrollLeft;
      
      // Set the chat position relative to the clicked element
      chat.style.top = `${trueTop - 250}px`;
      chat.style.left = `${trueLeft - 20}px`;
}

const getElementPosition = (event: React.MouseEvent<HTMLDivElement>): { top: number, left: number } => {
  const { currentTarget } = event;
  const rect = (currentTarget as HTMLElement).getBoundingClientRect();
  
  return { top: rect.top, left: rect.left };
};

const handleClick = async (event: React.MouseEvent<HTMLDivElement>, videoUrl: string) => {
  const chatElement = document.querySelector('.abrviate-chat') as HTMLElement;
  const { top, left } = getElementPosition(event);

  const chatStorage: ChatStorage | null = await storage.getItem('local:chatStorage');
  const lastBlur: number | null = await storage.getItem('local:lastBlur');


  console.log("chatStorage", chatStorage, "chatElement", chatElement, "lastBlur", lastBlur);

  if (!chatElement || !chatStorage || lastBlur === null) {
    return;
  }

  // Protect from double event (onBlur/onClick)
  // If the chat is already open for the same video and the last time onBlur was less than 300ms ago, do nothing
  if (chatStorage.videoUrl === videoUrl && lastBlur > Date.now() - 300) {
    return;
  }

  // If the chat is already open for the same video, close it (toggle)
  if (chatStorage.videoUrl === videoUrl && !chatElement.classList.contains('hidden')) {
    chatElement.classList.add('hidden');
    return;
  }

  console.log("setting chat storage");
  await setChatStorage({ ...chatStorage, videoUrl });
  resetChatPosition(chatElement, { top, left });

  // If the chat is hidden, show it
  if (chatElement.classList.contains('hidden')) {
    chatElement.classList.remove('hidden');
  }

  chatElement.focus();
};

export const AbrviateButton: React.FC<{ videoUrl: string }> = ({ videoUrl }) => {
  return (
    <div onClick={function(event) { handleClick(event, videoUrl); }}>
      <svg id="uuid-ed7ed55a-59f9-4e2f-ab7d-cf178b2cc5ff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 769.5 801.09" style={{
        fill: 'white'
      }}>
        <path d="M242.88,647.07c-26.9-14.05-51.44-32.07-73.16-53.79-27.53-27.53-49.14-59.57-64.22-95.22-15.6-36.87-23.5-76.09-23.5-116.55s7.91-79.68,23.5-116.55c15.08-35.65,36.69-67.69,64.22-95.22s59.57-49.14,95.22-64.22c36.87-15.6,76.09-23.5,116.55-23.5,28.71,0,56.79,4,83.85,11.88l59.67-65.96C480.72,9.92,432.27,0,381.5,0,170.8,0,0,170.8,0,381.5c0,144.8,80.67,270.76,199.52,335.38l43.36-69.81Z"/>
        <polygon points="609.21 4.29 357.99 281.98 461.36 312.56 288.91 515.45 366.63 538.45 205.2 798.36 528.41 507.13 450.4 483.41 675.15 256.77 596.77 233.58 768.58 51.44 609.21 4.29" stroke="#000" strokeMiterlimit="10"/>
        <path d="M169.08,374.25h-80.32s0,12,0,12h80.34c-.06-2.07-.1-4.15-.1-6.24,0-1.92.03-3.84.08-5.75Z"/>
        <path d="M385.51,167.04v-77.54s-12,0-12,0v77.68c2.81-.11,5.64-.18,8.49-.18,1.17,0,2.34.03,3.51.04Z"/>
      </svg>
    </div>
  );
};