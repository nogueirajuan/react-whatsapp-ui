import React from 'react';
import { MessageButton } from '../types/Message';

interface InteractiveMessageProps {
  text: string;
  buttons: MessageButton[];
  isOwn?: boolean;
  onButtonClick?: (button: MessageButton) => void;
}

const InteractiveMessage: React.FC<InteractiveMessageProps> = ({
  text,
  buttons,
  isOwn = false,
  onButtonClick,
}) => {
  const bgColor = isOwn ? 'bg-whatsapp-sent' : 'bg-whatsapp-received';
  const textColor = 'text-whatsapp-text';

  return (
    <div className={`flex flex-col gap-2 max-w-xs ${isOwn ? 'ml-auto' : ''}`}>
      <div className={`${bgColor} ${textColor} rounded-2xl px-4 py-2 break-words`}>
        <p className="text-sm">{text}</p>
      </div>
      {buttons && buttons.length > 0 && (
        <div className="flex flex-col gap-2 max-w-xs">
          {buttons.map((button) => (
            <button
              key={button.id}
              onClick={() => onButtonClick?.(button)}
              className="px-4 py-2 bg-whatsapp-primary text-white text-sm font-medium rounded-lg hover:bg-whatsapp-secondary transition-colors"
            >
              {button.text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default InteractiveMessage;
