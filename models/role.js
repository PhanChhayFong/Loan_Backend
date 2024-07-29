// models/role.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { v4: uuidv4 } = require('uuid');

const Role = sequelize.define('tbl_roles', {
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
  status: {
    type: DataTypes.STRING,
  },
  role_name: {
    type: DataTypes.STRING,
  },
});

module.exports = Role;
