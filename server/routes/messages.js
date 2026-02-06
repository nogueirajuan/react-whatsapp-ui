const {
  generateWamid,
  mapMetaPayloadToMessage,
  formatMetaResponse,
} = require('../utils/messageMapper');

module.exports = async function messagesRoute(fastify, options) {
  fastify.post('/:version/:phone_id/messages', async (request, reply) => {
    try {
      const { version, phone_id } = request.params;
      const payload = request.body;

      if (!payload.type) {
        return reply.status(400).send({
          error: 'Missing message type',
        });
      }

      const message = mapMetaPayloadToMessage(payload);

      if (!message) {
        return reply.status(400).send({
          error: 'Invalid message format or unsupported type',
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
