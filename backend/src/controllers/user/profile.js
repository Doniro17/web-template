const { user } = require('@model');
const mime = require('mime-types');

module.exports = async (ctx, next) => {
  ctx.log.info('Return current user profile');
  ctx.set('Content-Type', mime.contentType('file.json'));
  const body = await user.findOne({
    where: {
      id: ctx.req.user.id,
    },
  });
  ctx.body = JSON.stringify(body);
};
