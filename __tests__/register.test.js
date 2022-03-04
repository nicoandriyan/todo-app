const request = require('supertest');
const app = require('./../app');
const { queryInterface } = require('../models/index').sequelize;

beforeAll(async () => {
  await queryInterface.bulkDelete('Users', null, {
    truncate: true,
    cascade: true,
    restartIdentity: true
  });
});

describe('register feature tests', () => {

  test('successful register', async () => {
    const user = {
      username: 'user2',
      email: 'user2@mail.com',
      password: 'password'
    }
    const { body } = await request(app)
      .post('/register')
      .send(user)
      .expect(201);
    expect(body).toEqual(expect.objectContaining({
      id: expect.any(Number),
      username: 'user2',
      email: 'user2@mail.com'
    }));
  });

  test('fail register because missing password', async () => {
    const user = {
      username: 'user2',
      email: 'user2@mail.com'
    }
    const { body } = await request(app)
      .post('/register')
      .send(user)
      .expect(400);
    expect(body.message).toBe('password cannot be empty');
  });

});
