require('babel-register');

var clientConfig = require('./clientConfig');
var serverConfig = require('./serverConfig');

const options = { isDevelopmentBuild: true };

module.exports = [
  clientConfig(options),
  serverConfig(options)
];
