const { user } = require('@model');
const userList = require('@root/controllers/user/userList');
const mime = require('mime-types');
jest.mock('@model');

describe('get Users list', () => {
  let ctx;
  beforeEach(() => {
    ctx = {
      log: {
        info: () => {},
      },
      set: () => {},
    };
  });
  const dbResponse = [
    {
      username: 'client',
      email: 'client@mail.ru',
      phone: '88005550525',
    },
    {
      username: 'cucumber',
      email: 'cucumber@gmail.com',
      phone: '814191420',
    },
  ];

  it('Should return user list as json', async () => {
    user.findAll.mockResolvedValue(dbResponse);
    await userList(ctx);
    expect(ctx.body).toEqual(
      '{"users":[{"username":"client","email":"client@mail.ru","phone":"88005550525"},{"username":"cucumber","email":"cucumber@gmail.com","phone":"814191420"}]}',
    );
  });

  it('Should set content type', async () => {
    const setMock = jest.fn();
    ctx.set = setMock;
    await userList(ctx);
    expect(setMock.mock.calls.length).toBe(1);
    expect(setMock.mock.calls[0][0]).toBe('Content-Type');
    expect(setMock.mock.calls[0][1]).toBe(mime.contentType('file.json'));
  });
});
