const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) { // this is for deployment of MySQL at Heroku
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else { // this config to be used to run DB locally, be sure .ENV has these vars defined
  sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
  }
);
}

module.exports = sequelize;
