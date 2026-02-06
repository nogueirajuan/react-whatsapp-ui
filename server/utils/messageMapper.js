const { randomUUID } = require('crypto');
const { getMapper } = require('../mappers');

function generateWamid() {
  return `wamid.${randomUUID().replace(/-/g, '').substring(0, 24)}`;
}

function mapMetaPayloadToMessage(payload) {
  try {
    const mapper = getMapper(payload.type);

    if (!mapper) {
      console.warn(`No mapper found for message type: ${payload.type}`);
      return null;
    }

    const content = mapper(payload);

    if (!content) {
      return null;
    }

    return {
      id: randomUUID(),
      content,
      sender: 'bot',
      timestamp: new Date(),
    };
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
