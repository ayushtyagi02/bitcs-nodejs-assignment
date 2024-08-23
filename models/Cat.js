const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Cat = sequelize.define('Cat', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  breed: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false,
});

module.exports = Cat;
