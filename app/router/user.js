'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const apiUserRouter = app.router.namespace('/api/user');
  const { controller, middleware } = app;
  const { user } = controller;
  const tokenRequired = middleware.tokenRequired();
  apiUserRouter.post('/login', user.login);
  apiUserRouter.post('/logout', user.logout);
  apiUserRouter.post('/register', user.register);
  apiUserRouter.get('/info', tokenRequired, user.info);
};
