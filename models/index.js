// models/index.js
const sequelize = require('../config/database');

const Loan = require('./loan');
const Customer = require('./customer');
const User = require('./user');
const Role = require('./role');

const connectDb = async () => {
  try {
    await sequelize.sync({ force: false }); // Set to true only if you want to drop and recreate tables
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = { Loan, Customer, User, Role, connectDb };
