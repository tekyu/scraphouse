// @ts-nocheck
import mongoose from 'mongoose';
import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { Db } from 'mongodb';
import config from '../config/index';

const MongoStoreSession = MongoStore(session);

export default async ({
  app,
  logger,
}: {
  app: express.Application;
  logger: any;
}): Promise<Db> => {
  // CONNECTION EVENTS
  // When successfully
  mongoose.connection.on('connected', () => {
    logger.info(
      `✌️ Mongoose default connection open to ${config.db.databaseURL}`,
    );
  });
  const mongoConnection = await mongoose.connect(config.db.databaseCON, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  app.use(
    session({
      store: new MongoStoreSession({
        mongooseConnection: mongoConnection.connection,
      }),
      resave: true,
      saveUninitialized: true,
      secret: config.db.databaseSecret,
    }),
  );

  return mongoConnection.connection.db;
};
