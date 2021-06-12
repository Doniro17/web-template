const { Order, OrderProduct } = require('@model');
const { haveRights } = require('@root/middleware');
const mime = require('mime-types');

module.exports = async (ctx, next) => {
  let products = [];
  const responseOrders = [];
  let orders = {};
  const userId = ctx.req.user.id;
  if (haveRights(ctx.req.user.id, 'courier') && ctx.query.status === 'created') {
    orders = await Order.findAll({
      attributes: ['userId', 'status'],
      where: {
        status: 'created',
      },
    });
  } else {
    orders = await Order.findAll({
      attributes: ['id', 'userId', 'status', 'courierId'],
      where: {
        userId: userId,
      },
    });
  }
  for (const order of orders) {
    products = await OrderProduct.findAll({
      attributes: ['productId'],
      where: {
        orderId: order.dataValues.id,
      },
    });
    responseOrders.push({
      id: order.dataValues.id,
      userId: order.dataValues.userId,
      courierId: order.dataValues.courierId,
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
