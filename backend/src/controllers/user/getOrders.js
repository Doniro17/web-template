const { Order, OrderProduct } = require('@model');
const { haveRights } = require('@root/middleware');
const mime = require('mime-types');

module.exports = async (ctx, next) => {
  let products = [];
  const responseOrders = [];
  let orders = {};
  if (haveRights(ctx.req.user.id, 'courier') && ctx.query.status === 'created') {
    orders = await Order.findAll({
      attributes: ['userId', 'status'],
      where: {
        status: 'created',
      },
    });
  } else {
    orders = await Order.findAll({
      attributes: ['userId', 'status'],
    });
  }
  for (const order of orders) {
    products = await OrderProduct.findAll({
      attributes: ['productId'],
      where: {
        orderId: 4,
      },
    });
    responseOrders.push({
      userId: order.dataValues.userId,
      status: order.dataValues.status,
      products: products.map((product) => {
        return product.productId;
      }),
    });
  }
  ctx.log.info('User orders list');
  ctx.set('Content-Type', mime.contentType('file.json'));
  ctx.body = JSON.stringify({
    orders: responseOrders,
  });
};
