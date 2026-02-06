import React from 'react';
import TextMessage from '../components/TextMessage';
import PhotoMessage from '../components/PhotoMessage';
import AudioMessage from '../components/AudioMessage';
import CarouselMessage from '../components/CarouselMessage';
import TypingIndicator from '../components/TypingIndicator';

type MessageComponentType = React.FC<any>;

const componentMap: Record<string, MessageComponentType> = {
  text: TextMessage,
  photo: PhotoMessage,
  audio: AudioMessage,
  carousel: CarouselMessage,
  typing: TypingIndicator,
};

export function getMessageComponent(type: string): MessageComponentType | null {
  return componentMap[type] || null;
}

export function registerMessageComponent(
  type: string,
  component: MessageComponentType
): void {
  componentMap[type] = component;
}

export const messageTypeMapper = {
  getComponent: getMessageComponent,
  registerComponent: registerMessageComponent,
};
