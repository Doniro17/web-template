const { Product } = require('@model');
const updateProduct = require('@root/controllers/product/updateProduct');
const { NotFoundException, BadRequest } = require('@root/exceptions');
jest.mock('@model');

describe('update Product', () => {
  let ctx;
  beforeEach(() => {
    ctx = {
      request: {
        body: {},
      },
      params: {},
      log: {
        info: () => {},
      },
      set: () => {},
    };
  });
  const updatedProduct = {
    name: 'todelete',
    description: 'tooo 1',
    price: 1,
    update: () => {},
  };

  it('BadRequest on update Product without ID', async () => {
    try {
      await updateProduct(ctx);
    } catch (err) {
      expect(err).toBeInstanceOf(BadRequest);
    }
  });
  it('NotFound on update Product if there is no such product', async () => {
    ctx.params.id = 1;
    Product.findOne.mockResolvedValue(null);
    try {
      await updateProduct(ctx);
    } catch (err) {
      expect(err).toBeInstanceOf(NotFoundException);
    }
  });

  it('Should return Product by ID', async () => {
    ctx.params.id = 1;
    Product.findOne.mockResolvedValue(updatedProduct);
    await updateProduct(ctx);
    expect(ctx.body).toEqual(
      JSON.stringify({
        success: true,
        product: updatedProduct,
      }),
    );
  });
});
