import { Request, Response, NextFunction } from 'express';
import TemplateService from './template.service';

class TemplateController {
  service: any;

  constructor(service) {
    this.service = new service();
    this.createTemplate = this.createTemplate.bind(this);
    this.getTemplate = this.getTemplate.bind(this);
    this.manageTemplate = this.manageTemplate.bind(this);
  }

  async signUp(req: Request, res: Response, next: NextFunction) {
    const { username, email } = await this.service.signUp(req.body);
    console.log('signUp', { username, email });
    return res.status(200).send({ username, email });
  }

  async createTemplate(req: Request, res: Response, next: NextFunction) {
    const league = await this.service.createTemplate(req.body);
    return res.status(200).send(league);
  }

  async getTemplate(req: Request, res: Response, next: NextFunction) {
    const {
      params: { id },
    } = req;
    const league = await this.service.getTemplate(id);
    return league
      ? res.status(200).send(league)
      : res.status(404).send('not found');
  }

  async manageTemplate(req: Request, res: Response, next: NextFunction) {
    const template = await this.service.manageTemplate(req.body);
    return res.status(200).send(template);
  }
}

export default new TemplateController(TemplateService);
