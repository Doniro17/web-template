class ForbiddenException extends Error {
  constructor(...params) {
    super(...params);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ForbiddenException);
    }
    this.name = 'UnauthorziedException';
    // Custom debugging information
    this.date = new Date();
  }
}

module.exports = ForbiddenException;
