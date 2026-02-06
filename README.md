# react-whatsapp-ui

A React component library for testing WhatsApp Business API integrations locally. Build and test chat interfaces without configuring Meta webhooks or requiring an active WhatsApp Business account number.

## Why react-whatsapp-ui?

When developing WhatsApp Business API integrations, you typically need to:
- Configure a Meta webhook pointing to your production server
- Have an active WhatsApp Business account number
- Expose your local development machine to the internet

**react-whatsapp-ui** eliminates these barriers during development. Test your chat flows, button interactions, and message handling locally with a fully functional WhatsApp-like interface. When you're ready, integrate with real webhooks seamlessly.

## Features

✨ **Message Types**
- Text messages with up to 3 interactive buttons
- Photo messages with captions
- Audio messages with player controls and timeline
- Carousel messages (up to 10 items) with individual buttons (up to 2 per item)

🎯 **Real-time Feedback**
- Typing indicators with smooth animations
- Simulated request delays for realistic UX testing

🎨 **Design**
- WhatsApp-inspired UI with authentic styling
- Built with Tailwind CSS for easy customization
- Responsive design

🔧 **Developer Experience**
- TypeScript support out of the box
- Modular component architecture
- Ready for webhook integration
- Easy to extend with custom message types

## Installation

```bash
npm install react-whatsapp-ui
```

## Quick Start

```tsx
import React from 'react';
import ChatContainer from 'react-whatsapp-ui';

function App() {
  return <ChatContainer />;
}

export default App;
```

## Component Examples

### Text Message with Buttons

```tsx
const textMessage = {
  id: '1',
  content: {
    type: 'text',
    text: 'Choose an option:',
    buttons: [
      { id: '1', text: 'Option 1' },
      { id: '2', text: 'Option 2' },
      { id: '3', text: 'Option 3' }
    ]
  },
  sender: 'bot',
  timestamp: new Date()
};
```

### Photo Message

```tsx
const photoMessage = {
  id: '2',
  content: {
    type: 'photo',
    url: 'https://example.com/image.jpg',
    caption: 'Check this out!'
  },
  sender: 'bot',
  timestamp: new Date()
};
```

### Audio Message

```tsx
const audioMessage = {
  id: '3',
  content: {
    type: 'audio',
    url: 'https://example.com/audio.mp3',
    duration: 60
  },
  sender: 'bot',
  timestamp: new Date()
};
```

### Carousel Message

```tsx
const carouselMessage = {
  id: '4',
  content: {
    type: 'carousel',
    header: 'Select a product:',
    items: [
      {
        id: '1',
        title: 'Product 1',
        description: 'Great product',
        image: 'https://example.com/product1.jpg',
        buttons: [{ id: 'a', text: 'Select' }]
      },
      {
        id: '2',
        title: 'Product 2',
        description: 'Even better',
        image: 'https://example.com/product2.jpg',
        buttons: [{ id: 'b', text: 'Select' }]
      }
    ]
  },
  sender: 'bot',
  timestamp: new Date()
};
```

## Webhook Integration (Coming Soon)

This library is designed to prepare you for real webhook integration:

```tsx
// Future: Send messages via webhook
const handleWebhookMessage = async (payload) => {
  const response = await fetch('your-webhook-url', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
};

// Future: Receive and render webhook messages
const handleIncomingMessage = (webhookData) => {
  // Automatically rendered in the chat
};
```

## TypeScript Support

All components are fully typed. Check the `types/Message.ts` file for complete type definitions:

```tsx
import { Message, MessageButton, CarouselItem } from 'react-whatsapp-ui';
```

## Customization

### Styling with Tailwind CSS

The library uses Tailwind CSS for styling. Customize colors by updating your `tailwind.config.js`:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        whatsapp: {
          primary: '#25D366',
          secondary: '#128C7E'
        }
      }
    }
  }
};
```

## Use Cases

- 🤖 Chatbot development and testing
- 📱 Customer support interfaces
- 🎯 Message flow prototyping
- 🧪 Testing WhatsApp Business API integrations without Meta configuration
- 📊 Demonstrating chat functionality to stakeholders

## Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Related Resources

- [WhatsApp Business API Documentation](https://developers.facebook.com/docs/whatsapp/cloud-api/get-started)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)

---

**Built with ❤️ for developers testing WhatsApp integrations**
