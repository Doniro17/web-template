const { haveRights } = require('@root/middleware');
const { Order } = require('@model');
const mime = require('mime-types');
const { NotFoundException, BadRequest, ForbiddenException } = require('@root/exceptions');

module.exports = async (ctx, next) => {
  const userId = ctx.req.user.id;
  const id = ctx.params.id;
  const newStatus = ctx.request.body.status;
  if (id) {
    const order = await Order.findOne({
      where: {
        id: +id,
      },
    });

    if (order) {
      const courier = await haveRights(userId, 'courier');
      const client = (await haveRights(userId, 'client')) && userId === order.userId;
      ctx.log.info(`Update order by id=${id}`);
      let check = false;
      if (!client && !courier) {
        throw new ForbiddenException();
      }
      switch (newStatus) {
        case 'delivering':
          if (order.status === 'created' && courier) {
            check = true;
          }
          break;
        case 'delivered':
          if (order.status === 'delivering' && courier) {
            check = true;
          }
          break;
        case 'done':
          if (order.status === 'delivered' && client) {
            check = true;
          }
          break;
        case 'canceled':
          check = true;
          break;
        default:
          throw new BadRequest();
      }
      if (check && newStatus === 'delivering') {
        console.log('ALOOOOOOOOOOOOOOOOOOOOOOOOOOOOOAAAAAAAAAAAAAAAAAAAAAdasdSDSDSSDA');
        console.log(newStatus);
        order.update({
          courierId: +userId,
          status: newStatus,
        });
      } else if (check) {
        order.update({
          status: newStatus,
        });
      } else {
        throw new ForbiddenException();
      }
      ctx.set('Content-Type', mime.contentType('file.json'));
      ctx.body = JSON.stringify({
        success: true,
        order: order,
      });
    } else {
      throw new NotFoundException();
    }
  } else {
    throw new BadRequest();
  }
};
