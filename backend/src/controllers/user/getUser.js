const { user } = require('@model');
const mime = require('mime-types');
const { NotFoundException, BadRequest } = require('@root/exceptions');

module.exports = async (ctx, next) => {
  const id = ctx.params.id;
  if (id) {
    const body = await user.findOne({
      attributes: ['username', 'email', 'phone'],
      where: {
        id: +id,
      },
    });
    if (body) {
      ctx.log.info(`Return user by id=${id}`);
      ctx.set('Content-Type', mime.contentType('file.json'));
      ctx.body = JSON.stringify(body);
    } else {
      throw new NotFoundException();
    }
  } else {
    throw new BadRequest();
  }
};
