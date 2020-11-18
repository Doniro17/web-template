const { Product } = require('@model');
const mime = require('mime-types');
const { NotFoundException, BadRequest } = require('@root/exceptions');

module.exports = async (ctx, next) => {
  const id = ctx.params.id;
  if (id) {
    const product = await Product.findOne({
      where: {
        id: +id,
      },
    });
    if (product) {
      ctx.log.info(`Delete product by id=${id}`);
      ctx.set('Content-Type', mime.contentType('file.json'));
      await product.destroy();
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
