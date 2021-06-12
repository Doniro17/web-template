const fs = require('fs');
const multistream = require('pino-multi-stream').multistream;
const koaLogger = require('koa-pino-logger');
const streams = [
  { stream: process.stdout },
  { stream: fs.createWriteStream('./src/logs/delivery.info.log') },
  { level: 'debug', stream: fs.createWriteStream('./src/logs/delivery.debug.log') },
  { level: 'fatal', stream: fs.createWriteStream('./src/logs/delivery.error.log') },
];

module.exports = koaLogger(
  {
    prettyPrint: { colorize: true },
  },
  multistream(streams),
);
