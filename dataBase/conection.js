const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('railway','root', 'cwMdOEruvuQTiueRbfNCFhNkomljfrmb',{
  host: 'crossover.proxy.rlwy.net',
  dialect: 'mysql'
})

try{
  sequelize.authenticate()
  console.log('conexão com banco de dados bem sucedida')
} catch(err) {
  console.log(err)
}

module.exports = sequelize