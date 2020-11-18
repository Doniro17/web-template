const { Product } = require('@model');
const productList = require('@root/controllers/product/productList');
const mime = require('mime-types');
jest.mock('@model');

describe('get Products list', () => {
  let ctx;
  beforeEach(() => {
    ctx = {
      log: {
        info: () => {},
      },
      set: () => {},
    };
  });
  const products = [
    {
      name: 'todelete',
      description: 'tooo 1',
    },
    {
      name: 'todelete',
      description: 'tooo 1',
    },
  ];

  it('Should return user list as json', async () => {
    Product.findAll.mockResolvedValue(products);
    await productList(ctx);
    expect(ctx.body).toEqual(
      JSON.stringify({
        success: true,
        products: products,
      }),
    );
  });

  it('Should set content type', async () => {
    const setMock = jest.fn();
    ctx.set = setMock;
    await productList(ctx);
    expect(setMock.mock.calls.length).toBe(1);
    expect(setMock.mock.calls[0][0]).toBe('Content-Type');
    expect(setMock.mock.calls[0][1]).toBe(mime.contentType('file.json'));
  });
});
