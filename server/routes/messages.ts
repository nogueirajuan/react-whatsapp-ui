const {
  generateWamid,
  mapMetaPayloadToMessage,
  formatMetaResponse,
} = require('../utils/messageMapper');

module.exports = async function messagesRoute(fastify: any, options: any) {
  fastify.post<{
    Params: {
      version: string;
      phone_id: string;
    };
    Body: MetaPayload;
  }>(
    '/:version/:phone_id/messages',
    async (request: FastifyRequest, reply: FastifyReply) => {
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

        options.messageSubscribers.forEach((subscriber) => {
          subscriber({
            type: 'new_message',
            message,
          });
        });

        return reply.send(metaResponse);
      } catch (error) {
        fastify.log.error(error);
        return reply.status(500).send({
          error: 'Internal server error',
        });
      }
    }
  );
};
