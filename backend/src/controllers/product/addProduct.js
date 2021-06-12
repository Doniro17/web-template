const { Product } = require('@model');
const mime = require('mime-types');

module.exports = async (ctx, next) => {
  const {
    body: { name, description, price, image },
  } = ctx.request;
  ctx.log.info('Add new product');
  ctx.set('Content-Type', mime.contentType('file.json'));
  const data = await Product.create({ name, description, price, image });
  ctx.body = JSON.stringify(data);
};
