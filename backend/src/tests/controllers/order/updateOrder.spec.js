const { Order } = require('@model');
const updateOrder = require('@root/controllers/order/updateOrder');
const { NotFoundException, BadRequest, ForbiddenException } = require('@root/exceptions');
const { haveRights } = require('@root/middleware');
jest.mock('@model');
jest.mock('@root/middleware');

describe('update Order', () => {
  let ctx;
  beforeEach(() => {
    haveRights.mockResolvedValue(true);
    ctx = {
      params: {},
      request: {
        body: {},
      },
      log: {
        info: () => {},
      },
      set: () => {},
      req: {
        user: {
          id: 1,
        },
      },
    };
  });
  const order = {
    userId: 1,
    status: 'created',
    products: [1, 2],
    update: () => {},
  };

  it('BadRequest on update Order without ID', async () => {
    try {
      await updateOrder(ctx);
    } catch (err) {
      expect(err).toBeInstanceOf(BadRequest);
    }
  });
  it('BadRequest on update with incorrect status', async () => {
    ctx.params.id = 1;
    ctx.request.body.status = 'wrong';
    Order.findOne.mockResolvedValue(order);
    try {
      await updateOrder(ctx);
    } catch (err) {
      expect(err).toBeInstanceOf(BadRequest);
    }
  });
  it('NotFound on update request if there is no such Order', async () => {
    ctx.params.id = 1;
    Order.findOne.mockResolvedValue(null);
    try {
      await updateOrder(ctx);
    } catch (err) {
      expect(err).toBeInstanceOf(NotFoundException);
    }
  });
  it('Should return updated Order', async () => {
    ctx.params.id = 1;
    ctx.request.body.status = 'delivering';
    Order.findOne.mockResolvedValue(order);
    await updateOrder(ctx);
    expect(ctx.body).toEqual(
      JSON.stringify({
        success: true,
        order: order,
      }),
    );
  });
  it('Forbidden on update request if there is no permission', async () => {
    ctx.params.id = 1;
    ctx.req.user.id = 2;
    ctx.request.body.status = 'done';
    order.status = 'delivered';
    Order.findOne.mockResolvedValue(order);
    try {
      await updateOrder(ctx);
    } catch (err) {
      expect(err).toBeInstanceOf(ForbiddenException);
    }
  });
  it('Forbidden on update if the user is not client or courier', async () => {
    ctx.params.id = 1;
    haveRights.mockResolvedValue(false);
    Order.findOne.mockResolvedValue(order);
    try {
      await updateOrder(ctx);
    } catch (err) {
      expect(err).toBeInstanceOf(ForbiddenException);
    }
  });
});
