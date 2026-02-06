const { z } = require('zod');

const baseMessageSchema = z.object({
  messaging_product: z.literal('whatsapp').optional(),
  recipient_type: z.enum(['individual', 'group']).optional(),
  to: z.string(),
  type: z.string(),
});

const textMessageSchema = baseMessageSchema.extend({
  type: z.literal('text'),
  text: z.object({
    body: z.string(),
  }),
});

const messagePayloadSchema = z.union([textMessageSchema]);

function validateMessagePayload(payload) {
  try {
    const validated = messagePayloadSchema.parse(payload);
    return { valid: true, data: validated, error: null };
  } catch (error) {
    return {
      valid: false,
      data: null,
      error: error.errors?.[0]?.message || 'Invalid message format',
    };
  }
}

module.exports = {
  validateMessagePayload,
  messagePayloadSchema,
};
