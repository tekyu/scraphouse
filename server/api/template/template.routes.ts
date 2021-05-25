import { Router } from 'express';
import TemplateController from './template.controller';
import logger from '../../loaders/logger';
import middlewares from '../middlewares';

export default (router: Router) => {
  logger.info('✌️ Templating routes loaded');

  router.get('/', function (req, res) {
    res.send('Templates home page');
  });

  router.get('/get/:id', TemplateController.getTemplate);
  router.post('/create', TemplateController.createTemplate);
  router.post('/manage', TemplateController.manageTemplate);
};
