import React, { useState, useRef, useEffect } from 'react';

interface InputAreaProps {
  onSendMessage: (text: string) => void;
  disabled?: boolean;
}

const InputArea: React.FC<InputAreaProps> = ({ onSendMessage, disabled = false }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(
        textareaRef.current.scrollHeight,
        120
      ) + 'px';
    }
  }, [input]);

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSendMessage(input.trim());
      setInput('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-white border-t border-gray-200 p-4 flex items-end gap-3">
      <div className="flex-1 flex items-center bg-whatsapp-light rounded-full px-4 py-2">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Aa"
          disabled={disabled}
          className="flex-1 bg-transparent text-sm text-whatsapp-text outline-none resize-none max-h-30 placeholder-gray-500"
          rows={1}
        />
      </div>
      <button
        onClick={handleSend}
        disabled={disabled || !input.trim()}
        className={`flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
          disabled || !input.trim()
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-whatsapp-primary text-white hover:bg-whatsapp-secondary'
        }`}
      >
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M2 5a2 2 0 012-2h6a1 1 0 01.82.45l2.84 4.267a1 1 0 010 1.498L10.82 14.55A1 1 0 0110 15H4a2 2 0 01-2-2V5z" />
          <path d="M15.5 1A1.5 1.5 0 0014 2.5v3A1.5 1.5 0 0015.5 7h3a1.5 1.5 0 001.5-1.5v-3A1.5 1.5 0 0018.5 1h-3z" />
        </svg>
      </button>
    </div>
  );
};

export default InputArea;
