import React from 'react';
import { Message as IMessage, MessageButton } from '../types/Message';
import TextMessage from './TextMessage';
import PhotoMessage from './PhotoMessage';
import AudioMessage from './AudioMessage';
import CarouselMessage from './CarouselMessage';
import TypingIndicator from './TypingIndicator';

interface MessageProps {
  message: IMessage;
  onButtonClick?: (button: MessageButton) => void;
}

const Message: React.FC<MessageProps> = ({ message, onButtonClick }) => {
  const isOwn = message.sender === 'user';

  const renderContent = () => {
    switch (message.content.type) {
      case 'text':
        return (
          <TextMessage
            text={message.content.text}
            buttons={message.content.buttons}
            isOwn={isOwn}
            onButtonClick={onButtonClick}
          />
        );
      case 'photo':
        return (
          <PhotoMessage
            url={message.content.url}
            caption={message.content.caption}
            isOwn={isOwn}
          />
        );
      case 'audio':
        return (
          <AudioMessage
            url={message.content.url}
            duration={message.content.duration}
            isOwn={isOwn}
          />
        );
      case 'carousel':
        return (
          <CarouselMessage
            header={message.content.header}
            items={message.content.items}
            isOwn={isOwn}
            onButtonClick={onButtonClick}
          />
        );
      case 'typing':
        return <TypingIndicator />;
      default:
        return null;
    }
  };

  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
      {renderContent()}
    </div>
  );
};

export default Message;
