const { user } = require('@model');
const mime = require('mime-types');
const { NotFoundException, BadRequest } = require('@root/exceptions');

module.exports = async (ctx, next) => {
  const id = ctx.params.id;
  if (id) {
    const body = await user.findOne({
      where: {
        id: +id,
      },
    });
    if (body) {
      ctx.log.info(`Delete user by id=${id}`);
      ctx.set('Content-Type', mime.contentType('file.json'));
      await body.destroy();
      ctx.body = JSON.stringify({
        success: true,
      });
    } else {
      throw new NotFoundException();
    }
  } else {
    throw new BadRequest();
  }
};
