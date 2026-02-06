const Fastify = require('fastify');
const websocket = require('@fastify/websocket');
const cors = require('@fastify/cors');
const messagesRoute = require('./routes/messages');

const fastify = Fastify({
  logger: true,
  bodyLimit: 1048576,
});

fastify.register(cors, {
  origin: '*',
  credentials: true,
});

fastify.register(websocket);

const messageSubscribers = new Set();

fastify.register(async (fastify) => {
  fastify.get('/ws', { websocket: true }, (connection) => {
    const subscriber = (data) => {
      connection.socket.send(JSON.stringify(data));
    };

    messageSubscribers.add(subscriber);

    connection.socket.on('close', () => {
      messageSubscribers.delete(subscriber);
    });
  });
});

fastify.register(messagesRoute, { messageSubscribers });

const start = async () => {
  try {
    await fastify.listen({ port: 3001, host: '127.0.0.1' });
    console.log('Server running at http://127.0.0.1:3001');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
