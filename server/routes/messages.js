const {
  generateWamid,
  mapMetaPayloadToMessage,
  formatMetaResponse,
} = require('../utils/messageMapper');
const { validateMessagePayload } = require('../schemas/messageSchema');

module.exports = async function messagesRoute(fastify, options) {
  fastify.post('/:version/:waba_id/messages', async (request, reply) => {
    try {
      const { version, waba_id } = request.params;
      const payload = request.body;

      const validation = validateMessagePayload(payload);

      if (!validation.valid) {
        return reply.status(400).send({
          error: validation.error,
        });
      }

      const message = mapMetaPayloadToMessage(payload);

      if (!message) {
        return reply.status(400).send({
          error: 'Failed to process message or unsupported type',
        });
      }

      const messageId = generateWamid();
      const metaResponse = formatMetaResponse(payload.to, messageId);

      for (const subscriber of options.messageSubscribers.values()) {
        subscriber({
          type: 'new_message',
          message,
        });
      }

      return reply.send(metaResponse);
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({
        error: 'Internal server error',
      });
    }
  });
};
