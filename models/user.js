// models/user.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { v4: uuidv4 } = require('uuid');
const Role = require('./role');

const User = sequelize.define('tbl_users', {
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
  username: {
    type: DataTypes.STRING,
  },
  passwordHash: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  phonenumber: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.STRING,
  },
  dob: {
    type: DataTypes.DATE,
  },
  img: {
    type: DataTypes.TEXT,
  },
  role_id: {
    type: DataTypes.UUID,
    references: {
      model: Role,
      key: 'id',
    },
  },
});

User.belongsTo(Role, { foreignKey: 'role_id', as: 'role' });

module.exports = User;
