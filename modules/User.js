const conection = require('../dataBase/conection');
const { DataTypes } = require('sequelize');

const User = conection.define('User', {
  ocupation: {
    type: DataTypes.STRING,
    allowNull: false
  },
  salary: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  newsletter: {
    type: DataTypes.BOOLEAN
  }
})

module.exports = User