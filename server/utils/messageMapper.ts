const { v4: uuidv4 } = require('uuid');

function generateWamid() {
  return `wamid.${uuidv4().replace(/-/g, '').substring(0, 24)}`;
}

function mapMetaPayloadToMessage(payload: any) {
  try {
    if (payload.type === 'text' && payload.text?.body) {
      return {
        id: uuidv4(),
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

function formatMetaResponse(to: string, messageId: string) {
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
