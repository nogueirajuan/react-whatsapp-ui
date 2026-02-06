const { mapTextMessage } = require('./text');

const mappers = {
  text: mapTextMessage,
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
