function mapInteractiveMessage(payload) {
  if (!payload.interactive?.body?.text) {
    return null;
  }

  if (payload.interactive.type !== 'button') {
    return null;
  }

  const buttons = payload.interactive.action?.buttons || [];

  if (buttons.length === 0 || buttons.length > 3) {
    return null;
  }

  const mappedButtons = buttons
    .filter((btn) => btn.type === 'reply' && btn.reply?.id && btn.reply?.title)
    .map((btn) => ({
      id: btn.reply.id,
      text: btn.reply.title,
    }));

  if (mappedButtons.length === 0) {
    return null;
  }

  return {
    type: 'interactive',
    text: payload.interactive.body.text,
    buttons: mappedButtons,
  };
}

module.exports = { mapInteractiveMessage };
