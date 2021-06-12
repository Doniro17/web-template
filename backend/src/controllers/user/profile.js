const { user } = require('@model');
const mime = require('mime-types');
/*
"id": 11,
    "username": "courier",
    "password": "courier",
    "email": "courier",
    "phone": "123",
    "balance": 0,
    "role": [
        "courier"
    ],
*/
module.exports = async (ctx, next) => {
  ctx.log.info('Return current user profile');
  ctx.set('Content-Type', mime.contentType('file.json'));
  const body = await user.findOne({
    attributes: ['id', 'username', 'email', 'phone', 'balance', 'role'],
    where: {
      id: ctx.req.user.id,
    },
  });
  ctx.cookies.set('loggedIn', 'true', { httpOnly: false });
  ctx.body = JSON.stringify(body);
};
