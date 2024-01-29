// ENTRY POINT INTO THE APPLICATION
const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config/configuration');
const logger = require('./config/logger');

let server;

// INITIALIZE DB CONNECTION -> RUN EXPRESS APP

console.log(config.mongoose.url, config.mongoose.options)
mongoose.connect(config.mongoose.url).then(() => {
  logger.info('CONNECTED TO DB');
  server = app.listen(config.port, () => { logger.info(`APP RUNNING ON PORT ${config.port}`); });
});

// ERROR HANDLER
const exitHandler = () => {
  if (server) {
    server.close(() => { logger.info('Server closed'); process.exit(1); });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) { server.close(); }
});
