const { user } = require('@model');
const getProduct = require('@root/controllers/product/getProduct');
const { NotFoundException, BadRequest } = require('@root/exceptions');
jest.mock('@model');

describe('get Product', () => {
  let ctx;
  beforeEach(() => {
    ctx = {
      params: {},
      log: {
        info: () => {},
      },
      set: () => {},
    };
  });
  const requestedProduct = {
    name: 'todelete',
    description: 'tooo 1',
  };

  it('BadRequest on get product without ID', async () => {
    try {
      await getProduct(ctx);
    } catch (err) {
      expect(err).toBeInstanceOf(BadRequest);
    }
  });
  it('NotFound on get if there is no product', async () => {
    ctx.params.id = 1;
    user.findOne.mockResolvedValue(null);
    try {
      await getProduct(ctx);
    } catch (err) {
      expect(err).toBeInstanceOf(NotFoundException);
    }
  });

  it('Should return product by ID', async () => {
    ctx.params.id = 1;
    user.findOne.mockResolvedValue(requestedProduct);
    await getProduct(ctx);
    expect(ctx.body).toEqual(JSON.stringify(requestedProduct));
  });
});
