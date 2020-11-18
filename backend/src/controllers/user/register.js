const { user } = require('@model');
const mime = require('mime-types');

module.exports = async (ctx, next) => {
  const {
    body: { username, password, email, phone, balance, role },
  } = ctx.request;
  ctx.log.info('User registration');
  ctx.set('Content-Type', mime.contentType('file.json'));
  const data = await user.create({ username, password, email, phone, balance, role });
  ctx.body = JSON.stringify(data);
};
