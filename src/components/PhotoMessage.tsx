import React from 'react';

interface PhotoMessageProps {
  url: string;
  caption?: string;
  isOwn?: boolean;
}

const PhotoMessage: React.FC<PhotoMessageProps> = ({
  url,
  caption,
  isOwn = false,
}) => {
  return (
    <div className={`flex flex-col gap-2 max-w-xs ${isOwn ? 'ml-auto' : ''}`}>
      <div className="bg-white rounded-2xl overflow-hidden">
        <img
          src={url}
          alt="Message"
          className="max-w-xs h-auto rounded-2xl"
          onError={(e) => {
            e.currentTarget.src =
              'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23e0e0e0" width="200" height="200"/%3E%3Ctext x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%23999" font-size="14"%3EImage not found%3C/text%3E%3C/svg%3E';
          }}
        />
      </div>
      {caption && (
        <div className="bg-white rounded-2xl px-4 py-2">
          <p className="text-sm text-whatsapp-text">{caption}</p>
        </div>
      )}
    </div>
  );
};

export default PhotoMessage;
