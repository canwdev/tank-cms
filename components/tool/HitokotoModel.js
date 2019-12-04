const Sequelize = require('sequelize')
const seq = require('../../db/sequelize')

let Model = seq.define('hotokoto', {
  id: {
    type: Sequelize.BIGINT(),
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    allowNull: false
  },
  key: {
    type: Sequelize.BIGINT(),
    unique: true,
    allowNull: false
  },
  value: Sequelize.TEXT,
  type: Sequelize.STRING,
  from: Sequelize.STRING,
  creator: Sequelize.STRING,
  created_at: {
    type: Sequelize.BIGINT(),
    defaultValue: 0,
    set(val) {
      let num = parseInt(val)
      if (isNaN(num)) num = 0

      this.setDataValue('created_at', num);
    }
  },
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
