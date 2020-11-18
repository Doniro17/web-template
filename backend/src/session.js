const { session } = require('@model');
const koaSession = require('koa-session');

module.exports = (app) => {
  const get = async (key, maxAge, { rolling, ctx }) => {
    console.log('get sess');

    const sess = {};

    const obj = await session.findOne({
      where: {
        uuid: key,
      },
    });
    if (obj) {
      sess.passport = {
        user: obj.userId,
      };
    }
    return sess;
  };

  const set = async (key, sess, maxAge, { rolling, changed, ctx }) => {
    console.log('set sess', sess);

    const {
      passport: { user: id },
    } = sess;

    if (id) {
      await session.create({
        uuid: key,
        userId: id,
      });
    } else {
      const obj = await session.findOne({
        where: {
          uuid: key,
        },
      });
      if (obj) {
        await obj.destroy();
      }
    }
  };

  const destroy = async (key, { ctx }) => {
    console.log('destroy sess');

    const obj = await session.findOne({
      where: {
        uuid: key,
      },
    });
    if (obj) {
      await obj.destroy();
    }
  };

  const store = {
    get,
    set,
    destroy,
  };

  const options = {
    store,
  };

  return koaSession(options, app);
};
