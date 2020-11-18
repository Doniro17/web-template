const { Order, OrderProduct } = require('@model');
const mime = require('mime-types');
const { NotFoundException, BadRequest } = require('@root/exceptions');

module.exports = async (ctx, next) => {
  const id = ctx.params.id;
  if (id) {
    const order = await Order.findOne({
      attributes: ['userId', 'status'],
      where: {
        id: +id,
      },
    });
    if (order) {
      ctx.log.info(`Return user order by id=${id}`);
      ctx.set('Content-Type', mime.contentType('file.json'));
      const products = await OrderProduct.findAll({
        attributes: ['productId'],
        where: {
          orderId: +id,
        },
      });
      ctx.body = JSON.stringify({
        userId: order.userId,
        status: order.status,
        products: products.map((product) => {
          return product.productId;
        }),
      });
    } else {
      throw new NotFoundException();
    }
  } else {
    throw new BadRequest();
  }
};
