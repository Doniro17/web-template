require('module-alias/register');
require('dotenv').config();
const Koa = require('koa');
const router = require('@root/routes');
const koaBody = require('koa-body');
const session = require('./session');
const passport = require('koa-passport');
const logger = require('@root/logger');
const serve = require('koa-static');
const { staticDir } = require('@config/app');

const app = new Koa();

app.use(serve(staticDir));

app.use(koaBody());

app.keys = ['secretApp'];
app.use(session(app));

require('@root/auth');
app.use(logger);
app.use(passport.initialize());
app.use(passport.session());

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(process.env.PORT, () => {});
