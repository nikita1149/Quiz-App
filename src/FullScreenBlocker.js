import React from 'react';
import './quiz.css';

const FullScreenBlocker = ({ message, onClick, buttonText }) => {
  return (
    <div className="full-screen-blocker">
      <p>{message}</p>
      {onClick && <button onClick={onClick}>{buttonText}</button>}
    </div>
  );
};

export default FullScreenBlocker;
