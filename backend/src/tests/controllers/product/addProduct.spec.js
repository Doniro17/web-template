const { Product } = require('@model');
const addProduct = require('@root/controllers/product/addProduct');
jest.mock('@model');

describe('add new Product', () => {
  let ctx;
  beforeEach(() => {
    ctx = {
      request: {
        body: {},
      },
      log: {
        info: () => {},
      },
      set: () => {},
    };
  });
  const product = {
    name: 'todelete',
    description: 'tooo 1',
    price: 1,
    image: '/images/imaproductforrealthough.jpg',
  };

  it('Should return added product', async () => {
    Product.create.mockResolvedValue(product);
    await addProduct(ctx);
    expect(ctx.body).toEqual(JSON.stringify(product));
  });
});
