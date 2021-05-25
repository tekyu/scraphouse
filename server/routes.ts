import { Router } from 'express';
import config from './config';
import auth from './api/auth/auth.routes';
import template from './api/template/template.routes';

export const ApiRoutes = () => {
  const router = Router();
  auth(router);
  return router;
};

export const TemplateRoutes = () => {
  const router = Router();
  template(router);
  return router;
};

export const RootRouter = (App) => {
  App.use(config.apis.general, ApiRoutes());
  App.use(config.apis.template, TemplateRoutes());
};
