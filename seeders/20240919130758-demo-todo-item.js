'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        title: 'Task 1',
        description: 'setup nodejs with sequelize',
        duedate: '2024-09-19',
        user_id: '1',
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Task 2',
        description: 'CRUD Operations using nodejs sequelize with mysql',
        duedate: '2024-09-19',
        user_id: '1',
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Task 3',
        description: 'Run Nodejs Mysql using docker',
        duedate: '2024-09-19',
        user_id: '1',
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Task 4',
        description: 'docker installation',
        duedate: '2024-09-19',
        user_id: '1',
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};

