const { buildWebhookPayload } = require('./webhookBuilder');

async function emitWebhook(messageText) {
  const webhookUrl = process.env.WEBHOOK_URL;
  const webhookEnabled = process.env.WEBHOOK_ENABLED === 'true';

  if (!webhookEnabled) {
    console.log('[Webhook] Webhook disabled, skipping emission');
    return;
  }

  if (!webhookUrl) {
    console.warn('[Webhook] WEBHOOK_URL not configured');
    return;
  }

  try {
    const payload = buildWebhookPayload(messageText);

    console.log('[Webhook] Emitting webhook to:', webhookUrl);

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error(`[Webhook] Failed with status ${response.status}: ${response.statusText}`);
      return;
    }

    console.log('[Webhook] Successfully emitted');
  } catch (error) {
    console.error('[Webhook] Error emitting webhook:', error.message);
  }
}

module.exports = {
  emitWebhook,
};
