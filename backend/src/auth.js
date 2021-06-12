const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const { Unauthorized, ForbiddenException } = require('@root/exceptions');
const { user } = require('@model');
const { haveRights } = require('@root/middleware');

passport.serializeUser(function (user, done) {
  done(null, user.id);
});
passport.deserializeUser(async function (id, done) {
  try {
    const currentUser = await user.findOne({
      where: {
        id: +id,
      },
    });
    done(null, currentUser.dataValues);
  } catch (err) {
    done(err);
  }
});

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const currentUser = await user.findOne({
        where: {
          username: username,
          password: password,
        },
      });
      if (currentUser) {
        done(null, currentUser.dataValues);
      } else {
        done(null, false);
      }
    } catch (err) {
      done(err);
    }
  }),
);

const isAuthenticated = async (ctx, next) => {
  if (!ctx.isAuthenticated()) {
    throw new Unauthorized();
  } else {
    await next();
  }
};

const isClient = async (ctx, next) => {
  if (haveRights(ctx.req.user.id, 'client')) {
    await next();
  } else {
    throw new ForbiddenException();
  }
};

const isCourier = async (ctx, next) => {
  if (haveRights(ctx.req.user.id, 'courier')) {
    await next();
  } else {
    throw new ForbiddenException();
  }
};

const isAdmin = async (ctx, next) => {
  if (haveRights(ctx.req.user.id, 'admin')) {
    await next();
  } else {
    throw new ForbiddenException();
  }
};

module.exports = {
  isAuthenticated,
  isClient,
  isCourier,
  isAdmin,
};
