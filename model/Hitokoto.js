const Sequelize = require('sequelize')
const seq = require('../db/sequelize')

let Model = seq.define('hotokoto', {
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
  type: Sequelize.STRING,
  from: Sequelize.STRING,
  creator: Sequelize.STRING,
  created_at: Sequelize.STRING,
}, {timestamps: false})

Model.sync().then(async function () {
  // const count = await Model.count()
  // if (count === 0) {
  //   return Model.create({
  //
  //   })
  // }
})


module.exports = Model
