const { Product } = require('@model');
const mime = require('mime-types');
const { NotFoundException, BadRequest } = require('@root/exceptions');

module.exports = async (ctx, next) => {
  const requestProduct = ctx.request.body;
  const id = ctx.params.id;
  if (id) {
    const product = await Product.findOne({
      where: {
        id: +id,
      },
    });
    if (product) {
      ctx.log.info(`Update product by id=${id}`);
      product.update({
        name: requestProduct.name,
        description: requestProduct.description,
        price: requestProduct.price,
        image: requestProduct.image,
      });
      ctx.set('Content-Type', mime.contentType('file.json'));
      ctx.body = JSON.stringify({
        success: true,
        product: product,
      });
    } else {
      throw new NotFoundException();
    }
  } else {
    throw new BadRequest();
  }
};
