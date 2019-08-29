const Sequelize = require('sequelize')
const seq = require('../db/sequelize')

let Model = seq.define('setting', {
  id: {
    type: Sequelize.BIGINT(11),
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    allowNull: false
  },
  key: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  value: Sequelize.TEXT,
}, {timestamps: true})

Model.sync().then(async function () {
  const count = await Model.count()
  if (count === 0) {
    return Model.create({
      key: 'website_title',
      value: 'Can\'s Blog!'
    })
  }

})


module.exports = Model
