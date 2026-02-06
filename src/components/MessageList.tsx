import React, { useEffect, useRef } from 'react';
import { Message as IMessage, MessageButton } from '../types/Message';
import Message from './Message';

interface MessageListProps {
  messages: IMessage[];
  onButtonClick?: (button: MessageButton) => void;
}

const MessageList: React.FC<MessageListProps> = ({ messages, onButtonClick }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-whatsapp-light to-whatsapp-light">
      {messages.length === 0 ? (
        <div className="h-full flex items-center justify-center">
          <p className="text-gray-500 text-center">
            Start a conversation by sending a message
          </p>
        </div>
      ) : (
        <>
          {messages.map((message) => (
            <Message
              key={message.id}
              message={message}
              onButtonClick={onButtonClick}
            />
          ))}
          <div ref={messagesEndRef} />
        </>
      )}
    </div>
  );
};

export default MessageList;
