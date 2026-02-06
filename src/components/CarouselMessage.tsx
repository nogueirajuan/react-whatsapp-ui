import React, { useRef } from 'react';
import { CarouselItem as ICarouselItem, MessageButton } from '../types/Message';
import CarouselItem from './CarouselItem';

interface CarouselMessageProps {
  header?: string;
  items: ICarouselItem[];
  isOwn?: boolean;
  onButtonClick?: (button: MessageButton) => void;
}

const CarouselMessage: React.FC<CarouselMessageProps> = ({
  header,
  items,
  isOwn = false,
  onButtonClick,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      if (direction === 'left') {
        scrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className={`flex flex-col gap-3 max-w-2xl ${isOwn ? 'ml-auto' : ''}`}>
      {header && (
        <div className="bg-white rounded-2xl px-4 py-2">
          <p className="text-sm text-whatsapp-text">{header}</p>
        </div>
      )}
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide"
          style={{
            scrollBehavior: 'smooth',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {items.map((item) => (
            <CarouselItem
              key={item.id}
              item={item}
              onButtonClick={onButtonClick}
            />
          ))}
        </div>
        {items.length > 1 && (
          <>
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2 bg-white rounded-full shadow-lg p-2 hover:bg-gray-100 transition-colors z-10"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2 bg-white rounded-full shadow-lg p-2 hover:bg-gray-100 transition-colors z-10"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CarouselMessage;
