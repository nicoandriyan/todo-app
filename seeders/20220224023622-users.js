'use strict';

const { hash } = require("../helpers/hash-helper");

module.exports = {
  async up (queryInterface, Sequelize) {
    const dateNow = new Date();
    await queryInterface.bulkInsert('Users', [
      {
        username: 'admin',
        email: 'admin@mail.com',
        password: hash('password'),
        role: 'admin',
        createdAt: dateNow,
        updatedAt: dateNow
      },
      {
        username: 'user1',
        email: 'user1@mail.com',
        password: hash('password'),
        role: 'user',
        createdAt: dateNow,
        updatedAt: dateNow
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true
    });
  }
};
