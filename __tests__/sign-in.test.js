const request = require('supertest');
const { hash } = require('../helpers/hash-helper');
const { verify } = require('../helpers/jwt-helper');
const app = require('./../app');
const { queryInterface } = require('../models/index').sequelize;

const users = [
  {
    username: 'admin',
    email: 'admin@mail.com',
    password: hash('password'),
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

beforeAll((done) => {
  queryInterface.bulkDelete('Users', null, {
    truncate: true,
    cascade: true,
    restartIdentity: true
  })
    .then(() => {
      return queryInterface.bulkInsert('Users', users);
    })
    .then(() => {
      done();
    })
    .catch((error) => {
      done(error);
    });
});

describe('sign in feature tests', () => {
  test('successful sign in', (done) => {
    request(app)
      .post('/sign-in')
      .send({
        email: users[0].email,
        password: 'password'
      })
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual({ access_token: expect.any(String) });
        const payload = verify(body.access_token);
        expect(payload).toEqual(expect.objectContaining({
          id: expect.any(Number),
          email: users[0].email
        }));
        done();
      })
      .catch((error) => {
        done(error);
      });
  });
  test('failed to sign in because of email is null', (done) => {
    request(app)
      .post('/sign-in')
      .send({
        password: 'password'
      })
      .expect(400)
      .then(({ body }) => {
        expect(body).toEqual({ message: 'bad request' });
        expect(body.message).toMatch(/BAD REQUEST/i);
        done();
      })
      .catch((error) => {
        done(error);
      });
  });
  test('failed to sign in because of email is an empty string', (done) => {
    request(app)
      .post('/sign-in')
      .send({
        email: '',
        password: 'password'
      })
      .expect(400)
      .then(({ body }) => {
        expect(body).toEqual({ message: 'bad request' });
        expect(body.message).toMatch(/BAD REQUEST/i);
        done();
      })
      .catch((error) => {
        done(error);
      });
  });
  test('failed to sign in because of wrong email', (done) => {
    request(app)
      .post('/sign-in')
      .send({
        email: 'email@wrong.com',
        password: 'password'
      })
      .expect(401)
      .then(({ body }) => {
        expect(body.message).toMatch(/wrong email\/password/i);
        done();
      })
      .catch((error) => {
        done(error);
      });
  });
});

