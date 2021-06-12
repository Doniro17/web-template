const { Product } = require('@model');
const deleteProduct = require('@root/controllers/product/deleteProduct');
const { NotFoundException, BadRequest } = require('@root/exceptions');
jest.mock('@model');

describe('delete Product', () => {
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
  const deletedProduct = {
    name: 'todelete',
    description: 'tooo 1',
    destroy: () => {},
  };

  it('BadRequest on delete Product without ID', async () => {
    try {
      await deleteProduct(ctx);
    } catch (err) {
      expect(err).toBeInstanceOf(BadRequest);
    }
  });
  it('NotFound on delete if there is no such Product', async () => {
    ctx.params.id = 1;
    Product.findOne.mockResolvedValue(null);
    try {
      await deleteProduct(ctx);
    } catch (err) {
      expect(err).toBeInstanceOf(NotFoundException);
    }
  });
  it('Should return success status on delete', async () => {
    ctx.params.id = 1;
    Product.findOne.mockResolvedValue(deletedProduct);
    await deleteProduct(ctx);
    expect(ctx.body).toEqual(
      JSON.stringify({
        success: true,
      }),
    );
  });
});
