import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { ApiRoutes, RootRouter, TemplateRoutes } from '../routes';
import config from '../config';
import helmet from 'helmet';
import passport from '../api/middlewares/passport';
export default ({ app }: { app: express.Application }) => {
  /**
   * Health Check endpoints
   * @TODO Explain why they are here
   */
  app.get('/status', (req, res) => {
    res.status(200).end();
  });
  app.head('/status', (req, res) => {
    res.status(200).end();
  });

  // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable('trust proxy');

  // The magic package that prevents frontend developers going nuts
  // Alternate description:
  // Enable Cross Origin Resource Sharing to all origins by default

  app.use(
    cors({
      origin: config.front.domain,
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    })
  );

  // Some sauce that always add since 2014
  // "Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it."
  // Maybe not needed anymore ?
  //   app.use(require('method-override')());

  // Helmet
  app.use(helmet());
  // Middleware that transforms the raw string of req.body into json
  app.use(bodyParser.json());

  app.use(passport.initialize());
  app.use(passport.session());
  app.options('*', cors()); // enable pre-flight

  // Load API routes
  // this will only be invoked if the path starts with /bar from the mount point

  RootRouter(app);

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err['status'] = 404;
    next(err);
  });

  // error handlers
  app.use((err, req, res, next) => {
    /**
     * Handle 401 thrown by express-jwt library
     */
    if (err.name === 'UnauthorizedError') {
      return res.status(err.status).send({ message: err.message }).end();
    }
    return next(err);
  });
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });
};
