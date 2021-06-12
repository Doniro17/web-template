const { Order, OrderProduct } = require('@model');
const addOrder = require('@root/controllers/order/addOrder');
const { BadRequest } = require('@root/exceptions');
jest.mock('@model');

describe('add new Order', () => {
  let ctx;
  beforeEach(() => {
    ctx = {
      request: {
        body: {},
      },
      log: {
        info: () => {},
      },
      req: {
        user: {
          id: 1,
        },
      },
      set: () => {},
    };
  });
  const order = {
    userId: 1,
    status: 'created',
    products: [1, 2],
  };

  it('Should return added Order', async () => {
    ctx.request.body.products = [1, 2];
    Order.create.mockResolvedValue(order);
    OrderProduct.create.mockResolvedValue(order);
    await addOrder(ctx);
    expect(ctx.body).toEqual(JSON.stringify(order));
  });
  it('BadRequest on add Order without products field', async () => {
    try {
      await addOrder(ctx);
    } catch (err) {
      expect(err).toBeInstanceOf(BadRequest);
    }
  });
  it('BadRequest on add Order without products', async () => {
    ctx.request.body.products = [];
    try {
      await addOrder(ctx);
    } catch (err) {
      expect(err).toBeInstanceOf(BadRequest);
    }
  });
});
