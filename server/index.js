const Fastify = require('fastify');
const websocket = require('@fastify/websocket');
const cors = require('@fastify/cors');
const messagesRoute = require('./routes/messages');

const PORT = parseInt(process.env.SERVER_PORT || '3001', 10);
const HOST = process.env.SERVER_HOST || '127.0.0.1';

const fastify = Fastify({
  logger: true,
  bodyLimit: 1048576,
});

fastify.register(cors, {
  origin: '*',
  credentials: true,
});

fastify.register(websocket);

const messageSubscribers = new Map();

fastify.register(async (fastify) => {
  fastify.get('/ws', { websocket: true }, (socket, request) => {
    const connectionId = Date.now() + Math.random();

    console.log(`[WS] Connection opened. Total connections: ${messageSubscribers.size + 1}`);

    const subscriber = (data) => {
      if (socket.readyState === 1) {
        socket.send(JSON.stringify(data));
      }
    };

    messageSubscribers.set(connectionId, subscriber);

    socket.on('close', () => {
      messageSubscribers.delete(connectionId);
      console.log(`[WS] Connection closed. Total connections: ${messageSubscribers.size}`);
    });
  });
});

fastify.register(messagesRoute, { messageSubscribers });

const start = async () => {
  try {
    await fastify.listen({ port: PORT, host: HOST });
    console.log(`Server running at http://${HOST}:${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
