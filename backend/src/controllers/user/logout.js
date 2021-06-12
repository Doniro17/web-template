const mime = require('mime-types');

module.exports = async (ctx, next) => {
  ctx.log.info('Current user logout');
  ctx.set('Content-Type', mime.contentType('file.json'));
  ctx.body = JSON.stringify({});
  ctx.logout();
};
