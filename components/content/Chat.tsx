import React from 'react';

export let mockMutex = false;

const handleClose = async () => {
  const chat = document.querySelector('.abrviate-chat');

  if (!chat) {
    return;
  }

  if (!chat.classList.contains('hidden')) {
    chat.classList.add('hidden');
    await storage.setItem('local:lastBlur', Date.now());
  }
};

export const Chat: React.FC = () => {
  return (
    <div className="abrviate-chat hidden" tabIndex={0} onBlur={handleClose}>
      <p>Chat</p>
      <p onClick={handleClose} style={{
        position: 'absolute',
        top: '0',
        right: '0',
        cursor: 'pointer'
      }}>[x]</p>
    </div>
  );
};