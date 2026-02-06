function mapTextMessage(payload) {
  if (!payload.text?.body) {
    return null;
  }

  return {
    type: 'text',
    text: payload.text.body,
  };
}

module.exports = { mapTextMessage };
