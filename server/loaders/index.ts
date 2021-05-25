import expressLoader from './express';
import socketLoader from './socket';
import mongoLoader from './mongo';
import Logger from './logger';
import config from '../config';
import express from 'express';

export default async ({
  expressApp,
  logger,
}: {
  expressApp: express.Application;
  logger: any;
}) => {
  const mongoConnection = await mongoLoader({ app: expressApp, logger });
  await expressLoader({ app: expressApp });
  // await socketLoader({ app: expressApp, logger });
};
