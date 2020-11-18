const {
  NotFoundException,
  BadRequest,
  Unauthorized,
  ForbiddenException,
} = require('@root/exceptions');
const { StatusCodes } = require('http-status-codes');
const { ValidationError } = require('sequelize');
const mime = require('mime-types');

module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    ctx.log.error(`Failed request: ${e.message}`);
    ctx.set('Content-Type', mime.contentType('file.json'));
    if (e instanceof NotFoundException) {
      ctx.body = {
        message: 'Page not found',
      };
      ctx.status = StatusCodes.NOT_FOUND;
    } else if (e instanceof BadRequest) {
      console.log(e.fileName);
      ctx.body = {
        message: 'Bad request',
      };
      ctx.status = StatusCodes.BAD_REQUEST;
    } else if (e.name === 'SequelizeUniqueConstraintError') {
      ctx.body = {
        success: false,
        message: 'User already exist',
      };
      ctx.status = StatusCodes.BAD_REQUEST;
    } else if (e instanceof ValidationError) {
      ctx.body = JSON.stringify({
        success: false,
        errors: e.errors.map((i) => ({
          path: i.path,
          message: i.message,
        })),
      });
      ctx.status = StatusCodes.BAD_REQUEST;
    } else if (e instanceof Unauthorized) {
      ctx.body = {
        message: 'The user is unauthorized',
      };
      ctx.status = StatusCodes.UNAUTHORIZED;
    } else if (e instanceof ForbiddenException) {
      ctx.body = {
        message: 'Access denied',
      };
      ctx.status = StatusCodes.FORBIDDEN;
    } else {
      ctx.body = {
        message: e.message,
      };
    }
  }
};
