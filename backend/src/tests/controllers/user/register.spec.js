const { user } = require('@model');
const register = require('@root/controllers/user/register');
jest.mock('@model');

describe('check User registration', () => {
  let ctx;
  beforeEach(() => {
    ctx = {
      request: {
        body: {},
      },
      log: {
        info: () => {},
      },
      set: () => {},
    };
  });
  const registerUser = {
    username: 'client',
    password: '123123',
    email: 'client@mail.ru',
    phone: '88005550525',
    balance: 12345,
    role: ['client', 'courier'],
  };

  it('Check valid registration', async () => {
    user.create.mockResolvedValue(registerUser);
    await register(ctx);
    expect(ctx.body).toEqual(JSON.stringify(registerUser));
  });
});
