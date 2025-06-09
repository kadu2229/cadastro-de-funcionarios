const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('teste','root', '1234',{
  host: 'localhost',
  dialect: 'mysql'
})

try{
  sequelize.authenticate()
  console.log('conexão com banco de dados bem sucedida')
} catch(err) {
  console.log(err)
}

module.exports = sequelize