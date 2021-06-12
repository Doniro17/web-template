const Router = require('@koa/router');
const passport = require('koa-passport');

const router = new Router();

router.post('/', passport.authenticate('local', { failureRedirect: '/login' }), (ctx, next) => {
  ctx.body = 'user authenticated';
  next();
});

router.post('/logout', (ctx) => {
  ctx.logout();
});

module.exports = router;
