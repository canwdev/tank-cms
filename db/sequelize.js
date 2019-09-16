const Sequelize = require('sequelize')
const config = require('./config')

let seq = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  dialect: 'mysql',
  define: {
    charset: 'utf8',
    collate: 'utf8_general_ci',
    timestamps: true
  },
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  // disable logging; default: console.log
  logging: false
})

module.exports = seq
