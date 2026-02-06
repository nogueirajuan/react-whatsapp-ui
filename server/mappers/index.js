const { mapTextMessage } = require('./text');
const { mapInteractiveMessage } = require('./interactive');

const mappers = {
  text: mapTextMessage,
  interactive: mapInteractiveMessage,
};

function getMapper(type) {
  return mappers[type];
}

function registerMapper(type, mapperFn) {
  mappers[type] = mapperFn;
}

module.exports = {
  getMapper,
  registerMapper,
};
