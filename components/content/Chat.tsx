import React from 'react';

const handleClose = () => {
  const chat = document.querySelector('.abrviate-chat');
  chat?.classList.toggle('hidden');
};

export const Chat: React.FC = () => {
  return (
    <div className="abrviate-chat hidden" tabIndex={0} onBlur={handleClose} style={{
      width: '500px',
      height: '250px',
      backgroundColor: 'blue',
      position: 'fixed',
      top: '0',
      left: '0',
      zIndex: 1000
    }}>
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