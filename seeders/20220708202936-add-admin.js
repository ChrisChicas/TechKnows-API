'use strict';

const bcrypt = require('bcrypt')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [{
      first_name: 'Wajih',
      last_name: 'Hassouneh',
      username: 'admin',
      role: 'admin',
      password: await bcrypt.hash(process.env.ADMIN_PASSWORD, 10)
    }])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', {
      username: 'admin'
    })
  }
}