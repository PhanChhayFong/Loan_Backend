// models/loan.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { v4: uuidv4 } = require('uuid');

const Loan = sequelize.define('tbl_loans', {
  id: {
    type: DataTypes.UUID,
    defaultValue: uuidv4,
    primaryKey: true,
  },
  create_by: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  create_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  modify_by: {
    type: DataTypes.STRING,
  },
  modify_date: {
    type: DataTypes.DATE,
  },
  employment_status: {
    type: DataTypes.STRING,
  },
  monthly_income: {
    type: DataTypes.NUMERIC,
  },
  ln_type: {
    type: DataTypes.STRING,
  },
  ln_amt: {
    type: DataTypes.NUMERIC,
  },
  tenors: {
    type: DataTypes.INTEGER,
  },
  interest_rate: {
    type: DataTypes.NUMERIC,
  },
  payment_mode: {
    type: DataTypes.STRING,
  },
  ln_purpose: {
    type: DataTypes.STRING,
  },
  user_id: {
    type: DataTypes.STRING,
  },
  cust_id: {
    type: DataTypes.STRING,
  },
});

module.exports = Loan;
