const request = require('supertest');
const moment = require('moment');
const { hash } = require('../helpers/hash-helper');
const { sign } = require('../helpers/jwt-helper');
const app = require('./../app');
const { queryInterface } = require('../models/index').sequelize;

const users = [
  {
    username: 'user1',
    email: 'user1@mail.com',
    password: hash('password'),
    role: 'user',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    username: 'user2',
    email: 'user2@mail.com',
    password: hash('password'),
    role: 'user',
    createdAt: new Date(),
    updatedAt: new Date()
  },
];

describe('feature test todos, Get all, get single, delete, update', () => {
  let access_token = '';
  let access_token2 = '';
  const dateNow = new Date();
  beforeEach(async () => {
    await queryInterface.bulkDelete('Users', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true
    });
    await queryInterface.bulkInsert('Users', users);
    await queryInterface.bulkDelete('Todos', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true
    });
    await queryInterface.bulkInsert('Todos', [
      {
        title: 'mengerjakan PR Bahasa Jawa',
        description: 'halaman 5-7',
        due_date: moment(dateNow).add(2, 'days').toDate(),
        UserId: 1,
        createdAt: dateNow,
        updatedAt: dateNow
      },
      {
        title: 'beli pakan ayam',
        description: 'membeli pakan ayam di pasar hewan',
        due_date: moment(dateNow).add(1, 'days').toDate(),
        UserId: 1,
        createdAt: dateNow,
        updatedAt: dateNow
      },
    ]);
    access_token = sign({ id: 1, email: users[0].email });
    access_token2 = sign({ id: 2, email: users[1].email });
  });

  test('success get all Todos from user 1', async () => {
    const { body } = await request(app)
      .get('/todos')
      .set('access_token', access_token)
      .expect(200);
    expect(body).toHaveLength(2);
  });

  test('success get single todo', async () => {
    const { body } = await request(app)
      .get('/todos/1')
      .set('access_token', access_token)
      .expect(200);
    expect(body).toEqual(expect.objectContaining({
      title: 'mengerjakan PR Bahasa Jawa',
      description: 'halaman 5-7',
      due_date: expect.any(String)
    }));
  });

  test('success delete todo', async () => {
    const { body } = await request(app)
      .delete('/todos/2')
      .set('access_token', access_token)
      .expect(200);
    expect(body).toEqual({ message: 'todo has been successfully deleted' });
  });

  test('failed delete because todo is belong to another user', async () => {
    const { body } = await request(app)
      .delete('/todos/2')
      .set('access_token', access_token2)
      .expect(403);
    expect(body).toEqual({ message: 'forbidden' });
  });

  test('success update todo', async () => {
    const todo = {
      title: 'test edit',
      description: 'test edit',
      due_date: moment(new Date()).add(4, 'days').toDate()
    };
    const { body } = await request(app)
      .put('/todos/1')
      .set('access_token', access_token)
      .send(todo)
      .expect(200);
    expect(body).toEqual(expect.objectContaining({
      title: 'test edit',
      description: 'test edit',
      due_date: expect.any(String)
    }));
  });

});

describe('Create Todo', () => {
  let access_token1 = '';
  let access_token2 = '';
  beforeEach(async () => {
    await queryInterface.bulkDelete('Todos', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true
    });
    await queryInterface.bulkDelete('Users', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true
    });
    await queryInterface.bulkInsert('Users', users);
    access_token1 = sign({ id: 1, email: users[0].email });
    access_token2 = sign({ id: 2, email: users[1].email });
  });
  
  test('success create todo', async () => {
    const todo = {
      title: 'test',
      description: 'test',
      due_date: moment(new Date()).add(1, 'days').toDate()
    };
    const { body } = await request(app)
      .post('/todos')
      .set('access_token', access_token1)
      .send(todo)
      .expect(201);
    expect(body).toEqual(expect.objectContaining({
      title: 'test',
      description: 'test',
      due_date: expect.any(String)
    }));
  });

  test('fail create because due_date is before today', async () => {
    const todo = {
      title: 'test',
      description: 'test',
      due_date: moment(new Date()).subtract(2, 'days').toDate()
    };
    const { body } = await request(app)
      .post('/todos')
      .set('access_token', access_token1)
      .send(todo)
      .expect(400);
    expect(body.message).toBe('Tidak bisa input tanggal yang sudah lewat');
  });

});

