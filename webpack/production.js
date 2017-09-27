require('babel-register');
const clientConfig = require('./clientConfig');
const serverConfig = require('./serverConfig');

const options = { isDevelopmentBuild: false };

module.exports = [
  clientConfig(options),
  serverConfig(options),
];
