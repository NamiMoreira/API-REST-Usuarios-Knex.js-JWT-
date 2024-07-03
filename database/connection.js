var knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : 'localhost',
      user : 'root',
      password : '211309',
      database : 'apiuser'
    }
  });

module.exports = knex