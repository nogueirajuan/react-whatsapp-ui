import React, { useState, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import MessageList from './MessageList';
import InputArea from './InputArea';
import { Message as IMessage, MessageButton, MessageContent } from '../types/Message';
import { useWebSocketContext } from '../context/WebSocketContext';

const ChatContainer: React.FC = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addMessage = useCallback((content: MessageContent, sender: 'user' | 'bot' = 'bot') => {
    const newMessage: IMessage = {
      id: uuidv4(),
      content,
      sender,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
    return newMessage;
  }, []);

  const removeTypingIndicator = useCallback(() => {
    setMessages((prev) =>
      prev.filter((msg) => msg.content.type !== 'typing')
    );
  }, []);

  const sendUserMessage = useCallback(async (text: string) => {
    addMessage(
      {
        type: 'text',
        text,
      },
      'user'
    );

    setIsLoading(true);
    addMessage({ type: 'typing' }, 'bot');

    await new Promise((resolve) => setTimeout(resolve, 1500));

    removeTypingIndicator();

    addMessage({
      type: 'text',
      text: `You said: "${text}". This is a demo response!`,
      buttons: [
        {
          id: uuidv4(),
          text: 'Option 1',
        },
        {
          id: uuidv4(),
          text: 'Option 2',
        },
      ],
    });

    setIsLoading(false);
  }, [addMessage, removeTypingIndicator]);

  const handleSendMessage = useCallback(async (text: string) => {
    await sendUserMessage(text);
  }, [sendUserMessage]);

  const handleButtonClick = useCallback(async (button: MessageButton) => {
    await sendUserMessage(button.text);
  }, [sendUserMessage]);

  const showExamples = useCallback(() => {
    setMessages([]);
    addMessage({
      type: 'text',
      text: 'Welcome! Try sending a message or click the demo buttons below:',
      buttons: [
        {
          id: uuidv4(),
          text: 'Show Photo',
        },
        {
          id: uuidv4(),
          text: 'Show Carousel',
        },
        {
          id: uuidv4(),
          text: 'Show Audio',
        },
      ],
    }, 'bot');
  }, [addMessage]);

  const { lastMessage } = useWebSocketContext();

  useEffect(() => {
    if (lastMessage?.type === 'new_message' && lastMessage.message) {
      setMessages((prev) => {
        const messageExists = prev.some((msg) => msg.id === lastMessage.message.id);
        if (messageExists) {
          return prev;
        }
        return [...prev, lastMessage.message];
      });
    }
  }, [lastMessage]);

  React.useEffect(() => {
    showExamples();
  }, [showExamples]);

  return (
    <div className="flex flex-col h-screen bg-whatsapp-light">
      <div className="bg-whatsapp-secondary text-white p-4 shadow-lg">
        <h1 className="text-lg font-semibold">WhatsApp Simulator</h1>
      </div>
      <MessageList
        messages={messages}
        onButtonClick={handleButtonClick}
      />
      <InputArea
        onSendMessage={handleSendMessage}
        disabled={isLoading}
      />
    </div>
  );
};

export default ChatContainer;
