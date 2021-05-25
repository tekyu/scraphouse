import { Router } from 'express';
import AuthController from './auth.controller';
import logger from '../../loaders/logger';
import middlewares from '../middlewares';

export default (router: Router) => {
  logger.info('✌️ Auth routes loaded');

  router.post('/signup', AuthController.signUp);
  router.post('/signin', middlewares.isAuth);
  router.post('/forgotpassword', AuthController.forgotPassword);
};
