const { user } = require('@model');
const updateUser = require('@root/controllers/user/updateUser');
const { NotFoundException, BadRequest, ForbiddenException } = require('@root/exceptions');
jest.mock('@model');

describe('update User', () => {
  let ctx;
  beforeEach(() => {
    ctx = {
      request: {
        body: {},
      },
      params: {},
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
  const updatedUser = {
    username: 'client',
    password: '123123',
    email: 'client@mail.ru',
    update: () => {},
  };

  it('BadRequest on update user without ID', async () => {
    try {
      await updateUser(ctx);
    } catch (err) {
      expect(err).toBeInstanceOf(BadRequest);
    }
  });
  it('NotFound on update if there is no such user', async () => {
    ctx.params.id = 1;
    user.findOne.mockResolvedValue(null);
    try {
      await updateUser(ctx);
    } catch (err) {
      expect(err).toBeInstanceOf(NotFoundException);
    }
  });
  it('Forbidden on update user without permission', async () => {
    ctx.params.id = 2;
    try {
      await updateUser(ctx);
    } catch (err) {
      expect(err).toBeInstanceOf(ForbiddenException);
    }
  });

  it('Should return user by ID', async () => {
    ctx.params.id = 1;
    user.findOne.mockResolvedValue(updatedUser);
    await updateUser(ctx);
    expect(ctx.body).toEqual(
      JSON.stringify({
        success: true,
        user: updatedUser,
      }),
    );
  });
});
