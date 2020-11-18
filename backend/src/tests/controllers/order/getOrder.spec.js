const { Order, OrderProduct } = require('@model');
const getOrder = require('@root/controllers/order/getOrder');
const { NotFoundException, BadRequest } = require('@root/exceptions');
jest.mock('@model');

describe('get Order', () => {
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
  const order = {
    userId: 1,
    status: 'created',
    products: [1, 2],
  };

  it('BadRequest on get Order without ID', async () => {
    try {
      await getOrder(ctx);
    } catch (err) {
      expect(err).toBeInstanceOf(BadRequest);
    }
  });
  it('NotFound on get request if there is no such Order', async () => {
    ctx.params.id = 1;
    Order.findOne.mockResolvedValue(null);
    try {
      await getOrder(ctx);
    } catch (err) {
      expect(err).toBeInstanceOf(NotFoundException);
    }
  });

  it('Should return Order by ID', async () => {
    ctx.params.id = 1;
    Order.findOne.mockResolvedValue(order);
    OrderProduct.findAll.mockResolvedValue({
      map: (map) => {
        return [1, 2];
      },
    });
    await getOrder(ctx);
    expect(ctx.body).toEqual(JSON.stringify(order));
  });
});
