import React from 'react';
import { Message as IMessage, MessageButton } from '../types/Message';
import { getMessageComponent } from '../mappers/messageTypeMapper';

interface MessageProps {
  message: IMessage;
  onButtonClick?: (button: MessageButton) => void;
}

const Message: React.FC<MessageProps> = ({ message, onButtonClick }) => {
  const isOwn = message.sender === 'user';
  const Component = getMessageComponent(message.content.type);

  if (!Component) {
    return null;
  }

  const commonProps = { isOwn };
  const contentProps = { ...message.content, ...commonProps };

  if (message.content.type === 'text' || message.content.type === 'interactive' || message.content.type === 'carousel') {
    Object.assign(contentProps, { onButtonClick });
  }

  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
      <Component {...contentProps} />
    </div>
  );
};

export default Message;
