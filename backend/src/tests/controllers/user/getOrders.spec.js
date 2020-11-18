const { Order } = require('@model');
const getOrders = require('@root/controllers/user/getOrders');
const { haveRights } = require('@root/middleware');
jest.mock('@model');
jest.mock('@root/middleware');

describe('get Products list', () => {
  let ctx;
  beforeEach(() => {
    ctx = {
      log: {
        info: () => {},
      },
      set: () => {},
      query: {
        status: 'created',
      },
      req: {
        user: {
          id: 1,
        },
      },
    };
  });
  haveRights.mockResolvedValue(true);
  const orders = [
    {
      userId: 1,
      status: 'created',
      products: [1, 2],
      productId: 1,
      dataValues: {
        userId: 1,
      },
    },
    {
      userId: 1,
      status: 'delivered',
      products: [1, 2],
      productId: 2,
      dataValues: {
        userId: 1,
      },
    },
  ];

  it('Should return all orders for this user', async () => {
    Order.findAll.mockResolvedValue(orders);
    await getOrders(ctx);
    expect(ctx.body).toEqual(
      JSON.stringify({
        orders: [
          {
            userId: 1,
            products: [1, 2],
          },
          {
            userId: 1,
            products: [1, 2],
          },
        ],
      }),
    );
  });
});
