const { user } = require('@model');
const deleteUser = require('@root/controllers/user/deleteUser');
const { NotFoundException, BadRequest } = require('@root/exceptions');
jest.mock('@model');

describe('delete User', () => {
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
    };
  });
  const deletedUser = {
    username: 'client',
    password: '123123',
    email: 'client@mail.ru',
    destroy: () => {},
  };

  it('BadRequest on delete user without ID', async () => {
    try {
      await deleteUser(ctx);
    } catch (err) {
      expect(err).toBeInstanceOf(BadRequest);
    }
  });
  it('NotFound on delete if there is no such user', async () => {
    ctx.params.id = 1;
    user.findOne.mockResolvedValue(null);
    try {
      await deleteUser(ctx);
    } catch (err) {
      expect(err).toBeInstanceOf(NotFoundException);
    }
  });
  it('Should return success status on delete', async () => {
    ctx.params.id = 1;
    user.findOne.mockResolvedValue(deletedUser);
    await deleteUser(ctx);
    expect(ctx.body).toEqual(
      JSON.stringify({
        success: true,
      }),
    );
  });
});
