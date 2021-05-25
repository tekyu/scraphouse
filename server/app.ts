import express from 'express';
import config from './config';
import Logger from './loaders/logger';

async function startServer() {
  const app = express();
  await require('./loaders').default({ expressApp: app, logger: Logger });
  app.listen(config.ports.app, (err) => {
    if (err) {
      Logger.error(err);
      process.exit(1);
      return;
    }
    Logger.info(`✌️ Server listening on port ${config.ports.app}`);
  });
}

startServer();
