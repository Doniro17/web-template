const { user } = require('@model');
const mime = require('mime-types');

module.exports = async (ctx, next) => {
  const users = await user.findAll({
    attributes: ['username', 'email', 'phone'],
  });
  ctx.log.info('User list request');
  ctx.set('Content-Type', mime.contentType('file.json'));
  ctx.body = JSON.stringify({
    users: users,
  });
};
