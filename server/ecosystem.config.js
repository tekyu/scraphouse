module.exports = {
  apps: [{
    name: 'Mock Front',
    script: 'serve',

    // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
    env: {
      PM2_SERVE_PATH: '.',
      PM2_SERVE_PORT: '4314',
      PM2_SERVE_SPA: 'true',
      PM2_SERVE_HOMEPATE: './index.html',
    },
  }],
};
