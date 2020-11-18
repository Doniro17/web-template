const { user } = require('@model');
const getUser = require('@root/controllers/user/getUser');
const { NotFoundException, BadRequest } = require('@root/exceptions');
jest.mock('@model');

describe('get User', () => {
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
  const requestedUser = {
    username: 'client',
    password: '123123',
    email: 'client@mail.ru',
    phone: '88005550525',
    balance: 12345,
    role: ['client', 'courier'],
  };

  it('BadRequest on get user without ID', async () => {
    try {
      await getUser(ctx);
    } catch (err) {
      expect(err).toBeInstanceOf(BadRequest);
    }
  });
  it('NotFound on get request if there is no such user', async () => {
    ctx.params.id = 1;
    user.findOne.mockResolvedValue(null);
    try {
      await getUser(ctx);
    } catch (err) {
      expect(err).toBeInstanceOf(NotFoundException);
    }
  });

  it('Should return user by ID', async () => {
    ctx.params.id = 1;
    user.findOne.mockResolvedValue(requestedUser);
    await getUser(ctx);
    expect(ctx.body).toEqual(JSON.stringify(requestedUser));
  });
});
