const conection = require('../dataBase/conection');
const { DataTypes } = require('sequelize');

const User = conection.define('User', {
  Name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Ocupation: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Salary: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  Newsletter: {
    type: DataTypes.BOOLEAN
  }
})

module.exports = User