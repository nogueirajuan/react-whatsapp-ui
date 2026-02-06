import React, { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import MessageList from './MessageList';
import InputArea from './InputArea';
import { Message as IMessage, MessageButton, MessageContent } from '../types/Message';
import { useWebSocket } from '../hooks/useWebSocket';

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

  const handleSendMessage = useCallback(async (text: string) => {
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

  const handleButtonClick = useCallback((button: MessageButton) => {
    addMessage(
      {
        type: 'text',
        text: `Clicked: ${button.text}`,
      },
      'user'
    );

    setIsLoading(true);
    addMessage({ type: 'typing' }, 'bot');

    setTimeout(() => {
      removeTypingIndicator();

      if (button.text === 'Show Photo') {
        addMessage({
          type: 'photo',
          url: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=400&h=300&fit=crop',
          caption: 'Beautiful sunset photo',
        });
      } else if (button.text === 'Show Carousel') {
        addMessage({
          type: 'carousel',
          header: 'Choose your favorite option:',
          items: [
            {
              id: uuidv4(),
              title: 'Option 1',
              description: 'First carousel item',
              image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&h=300&fit=crop',
              buttons: [
                {
                  id: uuidv4(),
                  text: 'Select',
                },
              ],
            },
            {
              id: uuidv4(),
              title: 'Option 2',
              description: 'Second carousel item',
              image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
              buttons: [
                {
                  id: uuidv4(),
                  text: 'Select',
                },
              ],
            },
            {
              id: uuidv4(),
              title: 'Option 3',
              description: 'Third carousel item',
              image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=300&fit=crop',
              buttons: [
                {
                  id: uuidv4(),
                  text: 'Select',
                },
              ],
            },
          ],
        });
      } else if (button.text === 'Show Audio') {
        addMessage({
          type: 'audio',
          url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
          duration: 30,
        });
      } else {
        addMessage({
          type: 'text',
          text: `You selected "${button.text}". Great choice!`,
        });
      }
      setIsLoading(false);
    }, 1500);
  }, [addMessage, removeTypingIndicator]);

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

  const handleWebSocketMessage = useCallback((data: any) => {
    if (data.type === 'new_message' && data.message) {
      setMessages((prev) => [...prev, data.message]);
    }
  }, []);

  useWebSocket({
    url: 'ws://127.0.0.1:3001/ws',
    onMessage: handleWebSocketMessage,
    onError: (error) => {
      console.error('WebSocket error:', error);
    },
  });

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
