# Extending Message Types

This guide shows how to add support for new message types to the WhatsApp UI simulator.

## Architecture Overview

The system is built around two mapper registries:

- **Backend**: `server/mappers/` - Converts Meta WhatsApp API format → internal message format
- **Frontend**: `src/mappers/messageTypeMapper.ts` - Maps message types → React components

## Adding a New Message Type

### 1. Define the Type (Frontend)

Add your message type to `src/types/Message.ts`:

```typescript
export interface VideoMessageContent {
  type: 'video';
  url: string;
  thumbnail?: string;
  duration?: number;
}
```

Update the `MessageContent` union:

```typescript
export type MessageContent =
  | TextMessageContent
  | PhotoMessageContent
  | AudioMessageContent
  | CarouselMessageContent
  | VideoMessageContent
  | TypingIndicatorContent;
```

### 2. Create a React Component (Frontend)

Create `src/components/VideoMessage.tsx`:

```typescript
import React from 'react';

interface VideoMessageProps {
  url: string;
  thumbnail?: string;
  duration?: number;
  isOwn: boolean;
}

const VideoMessage: React.FC<VideoMessageProps> = ({
  url,
  thumbnail,
  duration,
  isOwn,
}) => {
  return (
    <div
      className={`rounded-lg overflow-hidden ${
        isOwn ? 'bg-whatsapp-primary' : 'bg-white'
      }`}
    >
      <video
        controls
        poster={thumbnail}
        className="w-64 h-auto"
        src={url}
      />
      {duration && (
        <p className="text-xs p-2 text-center">
          {Math.floor(duration / 60)}:{String(duration % 60).padStart(2, '0')}
        </p>
      )}
    </div>
  );
};

export default VideoMessage;
```

### 3. Register the Component (Frontend)

Update `src/mappers/messageTypeMapper.ts`:

```typescript
import VideoMessage from '../components/VideoMessage';

const componentMap: Record<string, MessageComponentType> = {
  text: TextMessage,
  photo: PhotoMessage,
  audio: AudioMessage,
  carousel: CarouselMessage,
  video: VideoMessage,  // Add this line
  typing: TypingIndicator,
};
```

### 4. Create Backend Mapper

Create `server/mappers/video.js`:

```javascript
function mapVideoMessage(payload) {
  if (!payload.video?.link) {
    return null;
  }

  return {
    type: 'video',
    url: payload.video.link,
    thumbnail: payload.video.thumbnail_url,
    duration: payload.video.duration,
  };
}

module.exports = { mapVideoMessage };
```

### 5. Register Backend Mapper

Update `server/mappers/index.js`:

```javascript
const { mapTextMessage } = require('./text');
const { mapVideoMessage } = require('./video');  // Add this

const mappers = {
  text: mapTextMessage,
  video: mapVideoMessage,  // Add this
};
```

### 6. Update Schema Validation (Backend)

Update `server/schemas/messageSchema.js`:

```javascript
const videoMessageSchema = baseMessageSchema.extend({
  type: z.literal('video'),
  video: z.object({
    link: z.string().url(),
    thumbnail_url: z.string().url().optional(),
    duration: z.number().optional(),
  }),
});

const messagePayloadSchema = z.union([
  textMessageSchema,
  videoMessageSchema,  // Add this
]);
```

## Testing Your New Type

### Via cURL

```bash
curl -X POST http://localhost:3001/v1/messages \
  -H "Content-Type: application/json" \
  -d '{
    "messaging_product": "whatsapp",
    "recipient_type": "individual",
    "to": "5511999999999",
    "type": "video",
    "video": {
      "link": "https://example.com/video.mp4",
      "thumbnail_url": "https://example.com/thumb.jpg",
      "duration": 45
    }
  }'
```

## Summary

To add a new message type:

1. Add type definition to `src/types/Message.ts`
2. Create React component in `src/components/`
3. Register component in `src/mappers/messageTypeMapper.ts`
4. Create mapper in `server/mappers/[type].js`
5. Register mapper in `server/mappers/index.js`
6. Add schema validation in `server/schemas/messageSchema.js`

The Message.tsx component will automatically render the new type without changes.
