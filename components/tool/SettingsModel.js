const Sequelize = require('sequelize')
const seq = require('../../db/sequelize')

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
  type: Sequelize.STRING
}, {timestamps: false})

Model.sync().then(async function () {
  const count = await Model.count()
  if (count === 0) {
    return Model.bulkCreate([
      {
        key: 'websiteTitle',
        value: '解构科技',
        type: 'website'
      },
      {
        key: 'companyName',
        value: '解构科技有限公司',
        type: 'website'
      }
    ])
  }
})


module.exports = Model
