import React from 'react';
import { CarouselItem as ICarouselItem, MessageButton } from '../types/Message';

interface CarouselItemProps {
  item: ICarouselItem;
  onButtonClick?: (button: MessageButton) => void;
}

const CarouselItem: React.FC<CarouselItemProps> = ({ item, onButtonClick }) => {
  return (
    <div className="flex-shrink-0 w-64 bg-white rounded-2xl overflow-hidden shadow-md">
      {item.image && (
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-40 object-cover"
          onError={(e) => {
            e.currentTarget.src =
              'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="160"%3E%3Crect fill="%23e0e0e0" width="200" height="160"/%3E%3Ctext x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%23999" font-size="12"%3ENo image%3C/text%3E%3C/svg%3E';
          }}
        />
      )}
      <div className="p-3 flex flex-col gap-2">
        <h3 className="font-semibold text-sm text-whatsapp-text truncate">
          {item.title}
        </h3>
        {item.description && (
          <p className="text-xs text-gray-600 line-clamp-2">
            {item.description}
          </p>
        )}
        {item.buttons && item.buttons.length > 0 && (
          <div className="flex flex-col gap-2 mt-2">
            {item.buttons.map((button) => (
              <button
                key={button.id}
                onClick={() => onButtonClick?.(button)}
                className="px-3 py-2 bg-whatsapp-primary text-white text-xs font-medium rounded-lg hover:bg-whatsapp-secondary transition-colors"
              >
                {button.text}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CarouselItem;
