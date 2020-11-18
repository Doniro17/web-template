const { user } = require('@model');
const mime = require('mime-types');
const { NotFoundException, BadRequest, ForbiddenException } = require('@root/exceptions');

module.exports = async (ctx, next) => {
  const requestUser = ctx.request.body;
  const id = ctx.params.id;
  if (id) {
    const body = await user.findOne({
      where: {
        id: +id,
      },
    });
    if (+id != ctx.req.user.id) {
      throw new ForbiddenException();
    }
    if (body) {
      ctx.log.info(`Update user by id=${id}`);
      body.update({
        username: requestUser.username,
        password: requestUser.password,
        email: requestUser.email,
        phone: requestUser.phone,
        balance: requestUser.balance,
        role: requestUser.role,
      });
      ctx.set('Content-Type', mime.contentType('file.json'));
      ctx.body = JSON.stringify({
        success: true,
        user: body,
      });
    } else {
      throw new NotFoundException();
    }
  } else {
    throw new BadRequest();
  }
};
