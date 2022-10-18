const { Sequelize } = require('sequelize');

const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize({
  dialect: 'mysql',
  dialectOption: {
    timezone: 'Asia/Seoul',
  },
  logging: false,
  host: process.env.mysql_dev_host,
  database: process.env.mysql_dev_database,
  username: process.env.mysql_dev_user,
  password: process.env.mysql_dev_password,
  port: process.env.mysql_dev_port
});

module.exports = sequelize;