const { randomUUID } = require('crypto');

function buildWebhookPayload(messageText) {
  const userWaId = process.env.USER_WA_ID;
  const userName = process.env.USER_NAME || 'User';
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const displayPhoneNumber = process.env.WHATSAPP_DISPLAY_PHONE_NUMBER;
  const timestamp = Math.floor(Date.now() / 1000).toString();

  return {
    entry: [
      {
        changes: [
          {
            field: 'messages',
            value: {
              contacts: [
                {
                  profile: {
                    name: userName,
                  },
                  wa_id: userWaId,
                },
              ],
              messages: [
                {
                  from: userWaId,
                  id: `wamid.${randomUUID().replace(/-/g, '').substring(0, 24)}`,
                  text: {
                    body: messageText,
                  },
                  timestamp,
                  type: 'text',
                },
              ],
              messaging_product: 'whatsapp',
              metadata: {
                display_phone_number: displayPhoneNumber,
                phone_number_id: phoneNumberId,
              },
            },
          },
        ],
        id: randomUUID().replace(/-/g, '').substring(0, 15),
      },
    ],
    object: 'whatsapp_business_account',
  };
}

module.exports = {
  buildWebhookPayload,
};
