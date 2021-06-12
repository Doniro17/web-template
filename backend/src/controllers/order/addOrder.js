const { Order, OrderProduct } = require('@model');
const mime = require('mime-types');
const { BadRequest } = require('@root/exceptions');

module.exports = async (ctx, next) => {
  const userId = ctx.req.user.id;
  const status = 'created';
  const {
    body: { products },
  } = ctx.request;
  if (products && products.length > 0) {
    ctx.log.info('Order creating');
    ctx.set('Content-Type', mime.contentType('file.json'));
    const order = await Order.create({ userId, status });
    const orderId = order.id;
    products.forEach(async (productId) => {
      await OrderProduct.create({ orderId, productId });
    });
    ctx.body = JSON.stringify({
      userId: userId,
      status: status,
      products: products,
    });
  } else {
    throw new BadRequest();
  }
};
