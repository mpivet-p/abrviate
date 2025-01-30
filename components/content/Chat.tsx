import React from 'react';

const handleClose = () => {
  const chat = document.querySelector('.abrviate-chat');

  // Delay is need to prevent onBlur execution before the onClick event is executed
  setTimeout(() => {
    if (chat && !chat.classList.contains('hidden')) {
      chat.classList.add('hidden');
      console.log("Hidden");
    }
  }, 100);

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