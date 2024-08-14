// config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ln_db', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
  port: 5433, 
});

module.exports = sequelize;
