'use strict';

const bcrypt = require('bcrypt');
const basicAuth = require('../src/auth/middleware/basic');
const { sequelizeDatabase, UsersModel } = require('../src/auth/models/user-model');

let user = {
  username: 'test',
  password: 'pass',
};


beforeAll (async () => {
  await sequelizeDatabase.sync();
  user.password = await bcrypt.hash(user.password, 5);
  await UsersModel.create(user);
});

afterAll (async () => {
  await sequelizeDatabase.drop();
  // if tests aren't passing maybe its a multiple - async issue
  await sequelizeDatabase.close();
});

describe('Basic Auth Middleware Tests', () => {

  // Basic dGVzdDpwYXNz
  test('test /signin route fails appropriately', async () => {
    // unit test of basic auth only
    let req = {
      headers: {
        authorization: 'Basic banana',
      },
    };
    let res = {};
    let next = jest.fn();

    await basicAuth(req, res, next);

    expect(next).toHaveBeenCalledWith('Not Authorized');
  });
  test('passes appropriately', async () => {
    let req = {
      headers: {
        authorization: 'Basic dGVzdDpwYXNz',
      },
    };
    let res = {};
    let next = jest.fn();

    await basicAuth(req, res, next);

    expect(next).toHaveBeenCalledWith();
  });
});
