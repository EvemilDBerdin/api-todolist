'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'Evemil',
        lastName: 'Berdin',
        email: 'evemilberdin@gmail.com',
        username: 'color',
        password: '$2a$10$k.0765KGUBmi/sz2PMqqHevSKBMQtGZu9B4NNs6H6UXZ8.acPiGQq',
        phonenumber: '09811100993',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo1fSwiaWF0IjoxNzI2NzQ5MjQzLCJleHAiOjE3MjY4MzU2NDN9.tJ8mXADfnovhZMjx9msbxvmWI3_4hia6mT3crvQxGyo',
        createdAt: new Date(),
        updatedAt: new Date(),
      }, 
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
