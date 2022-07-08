'use strict';
require('dotenv').config()

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('users', [{
      user_id:'1',
      first_name: 'Jo',
      last_name: 'Do',
      email: 'example@example.com',
      password: '123456789',
    }])

    const [users] = await queryInterface.sequelize.query(
      `SELECT user_id from users LIMIT 1;`
    );

    await queryInterface.bulkInsert('articles', [
      {
        article_id:'1',
        title: 'JavaScript',
        content: 'Seattle',
        user_id: '1'
        
      }, {
        article_id: '2',
        title: 'Python',
        content: 'Phoenix',
        user_id: '1',
        
      }
    ])

    const [articles] = await queryInterface.sequelize.query(
      `SELECT article_id from articles LIMIT 1;`
    );

    await queryInterface.bulkInsert('comments', [
      {
      
        comment_id: '1',
        comment: 'Wow!',
        author_id: users[0].user_id,
        article_id: articles[0].article_id,
        
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('articles', null, {});
    await queryInterface.bulkDelete('comments', null, {});
  }
};