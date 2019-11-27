const Sequelize = require('sequelize')
const seq = require('../../db/sequelize')

let Model = seq.define('menu', {
  id: {
    type: Sequelize.BIGINT(11),
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    allowNull: false
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  url: Sequelize.STRING,
  pid: {
    type: Sequelize.BIGINT(11),
    defaultValue: 0,
    allowNull: false
  },
  priority: {
    type: Sequelize.BIGINT(11),
    defaultValue: 1,
    allowNull: false
  }
})

Model.sync().then(async function () {
  const count = await Model.count()
  if (count === 0) {
    return Model.create({
      title: '首页',
      url: '/'
    })
  }
})

module.exports = Model
