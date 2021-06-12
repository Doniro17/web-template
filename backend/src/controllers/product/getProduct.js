const { Product } = require('@model');
const mime = require('mime-types');
const { NotFoundException, BadRequest } = require('@root/exceptions');

module.exports = async (ctx, next) => {
  const id = ctx.params.id;
  if (id) {
    const product = await Product.findOne({
      attributes: ['name', 'description', 'price', 'image'],
      where: {
        id: +id,
      },
    });
    if (product) {
      ctx.log.info(`Return product by its id=${id}`);
      ctx.set('Content-Type', mime.contentType('file.json'));
      ctx.body = JSON.stringify(product);
    } else {
      throw new NotFoundException();
    }
  } else {
    throw new BadRequest();
  }
};
