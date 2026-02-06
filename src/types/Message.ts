export type MessageType = 'text' | 'photo' | 'audio' | 'carousel';

type SupportedMessageTypes = {
  text: TextMessageContent;
  photo: PhotoMessageContent;
  audio: AudioMessageContent;
  carousel: CarouselMessageContent;
  typing: TypingIndicatorContent;
};

export interface MessageButton {
  id: string;
  text: string;
  payload?: string;
}

export interface CarouselItem {
  id: string;
  title: string;
  description?: string;
  image?: string;
  buttons?: MessageButton[];
}

export interface TextMessageContent {
  type: 'text';
  text: string;
  buttons?: MessageButton[];
}

export interface PhotoMessageContent {
  type: 'photo';
  url: string;
  caption?: string;
}

export interface AudioMessageContent {
  type: 'audio';
  url: string;
  duration?: number;
}

export interface CarouselMessageContent {
  type: 'carousel';
  header?: string;
  items: CarouselItem[];
}

export interface TypingIndicatorContent {
  type: 'typing';
}

export type MessageContent =
  | TextMessageContent
  | PhotoMessageContent
  | AudioMessageContent
  | CarouselMessageContent
  | TypingIndicatorContent;

export interface Message {
  id: string;
  content: MessageContent;
  sender: 'user' | 'bot';
  timestamp: Date;
}
