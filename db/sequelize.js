const Sequelize = require('sequelize')
const config = require('./config')

let seq = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
})

module.exports = seq
