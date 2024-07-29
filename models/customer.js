// models/customer.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { v4: uuidv4 } = require('uuid');

const Customer = sequelize.define('tbl_customers', {
  id: {
    type: DataTypes.UUID,
    defaultValue: uuidv4,
    primaryKey: true,
  },
  create_by: {
    type: DataTypes.STRING,
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
  cust_name: {
    type: DataTypes.STRING,
  },
  gender: {
    type: DataTypes.STRING,
  },
  dob: {
    type: DataTypes.DATE,
  },
  waitness_name: {
    type: DataTypes.STRING,
  },
  nationality: {
    type: DataTypes.STRING,
  },
  id_number: {
    type: DataTypes.STRING,
  },
  village: {
    type: DataTypes.STRING,
  },
  commune: {
    type: DataTypes.STRING,
  },
  district: {
    type: DataTypes.STRING,
  },
  province: {
    type: DataTypes.STRING,
  },
  phone_number: {
    type: DataTypes.STRING,
  },
  job: {
    type: DataTypes.STRING,
  },
  cust_img: {
    type: DataTypes.TEXT,
  },
  nid_img: {
    type: DataTypes.TEXT,
  },
  cust_status: {
    type: DataTypes.STRING,
  },
});

module.exports = Customer;
