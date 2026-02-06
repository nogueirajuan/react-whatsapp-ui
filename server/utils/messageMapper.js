const { randomUUID } = require('crypto');

function generateWamid() {
  return `wamid.${randomUUID().replace(/-/g, '').substring(0, 24)}`;
}

function mapMetaPayloadToMessage(payload) {
  try {
    if (payload.type === 'text' && payload.text?.body) {
      return {
        id: randomUUID(),
        content: {
          type: 'text',
          text: payload.text.body,
        },
        sender: 'bot',
        timestamp: new Date(),
      };
    }

    return null;
  } catch (error) {
    console.error('Error mapping Meta payload to message:', error);
    return null;
  }
}

function formatMetaResponse(to, messageId) {
  return {
    messaging_product: 'whatsapp',
    contacts: [
      {
        input: to,
        wa_id: to,
      },
    ],
    messages: [
      {
        id: messageId,
      },
    ],
  };
}

module.exports = {
  generateWamid,
  mapMetaPayloadToMessage,
  formatMetaResponse,
};
