import React from 'react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-center gap-1 p-3 bg-white rounded-2xl w-fit">
      <div className="typing-dot w-2 h-2 bg-gray-400 rounded-full" />
      <div className="typing-dot w-2 h-2 bg-gray-400 rounded-full" />
      <div className="typing-dot w-2 h-2 bg-gray-400 rounded-full" />
    </div>
  );
};

export default TypingIndicator;
