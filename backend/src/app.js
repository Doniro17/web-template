const Koa = require('koa');

const app = new Koa();

app.use(async (ctx, next) => {
  console.log('>>>> IN'); // eslint-disable-line no-console
  await next();
  console.log('<<<< OUT'); // eslint-disable-line no-console
});

app.listen(3000, () => {});
