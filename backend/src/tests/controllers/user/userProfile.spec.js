const { user } = require('@model');
const profile = require('@root/controllers/user/profile');
const mime = require('mime-types');
jest.mock('@model');

/*
module.exports = async (ctx, next) => {
  ctx.log.info('Return current user profile');
  ctx.set('Content-Type', mime.contentType('file.json'));
  const body = await user.findOne({
    where: {
      id: ctx.req.user.id,
    },
  });
  ctx.body = JSON.stringify(body);
};
*/
describe('get current User profile', () => {
  let ctx;
  beforeEach(() => {
    ctx = {
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
  const dbResponse = {
    username: 'client',
    email: 'client@mail.ru',
    phone: '88005550525',
  };

  it('Should return current user data', async () => {
    user.findOne.mockResolvedValue(dbResponse);
    await profile(ctx);
    expect(ctx.body).toEqual(JSON.stringify(dbResponse));
  });

  it('Should set content type', async () => {
    const setMock = jest.fn();
    ctx.set = setMock;
    await profile(ctx);
    expect(setMock.mock.calls.length).toBe(1);
    expect(setMock.mock.calls[0][0]).toBe('Content-Type');
    expect(setMock.mock.calls[0][1]).toBe(mime.contentType('file.json'));
  });
});
