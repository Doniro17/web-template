const { Product } = require('@model');
const mime = require('mime-types');

module.exports = async (ctx, next) => {
  const products = await Product.findAll({
    attributes: ['id', 'name', 'description', 'price', 'image'],
  });
  ctx.log.info('Products list request');
  ctx.set('Content-Type', mime.contentType('file.json'));
  ctx.body = JSON.stringify({
    success: true,
    products: products,
  });
};
