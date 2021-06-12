const { Order } = require('@model');
const mime = require('mime-types');
const { NotFoundException, BadRequest, ForbiddenException } = require('@root/exceptions');

module.exports = async (ctx, next) => {
  const id = ctx.params.id;
  if (id) {
    const order = await Order.findOne({
      where: {
        id: +id,
      },
    });
    if (order.userId !== ctx.req.user.id) {
      throw new ForbiddenException();
    }
    if (order) {
      ctx.log.info(`Delete users order by id=${id}`);
      ctx.set('Content-Type', mime.contentType('file.json'));
      await order.destroy();
      ctx.body = JSON.stringify({});
    } else {
      throw new NotFoundException();
    }
  } else {
    throw new BadRequest();
  }
};
