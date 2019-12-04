const Sequelize = require('sequelize')
const seq = require('../../db/sequelize')

let Model = seq.define('recruit_type', {
  type: {
    type: Sequelize.STRING,
    allowNull: false
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {timestamps: false})

Model.sync().then(async function () {
  const count = await Model.count()
  if (count === 0) {
    return Model.bulkCreate([
      {type: 'category', title: '社会招聘'},
      {type: 'category', title: '校园招聘'},
      {type: 'category', title: '实习生招聘'},
      {type: 'area', title: '北京'},
      {type: 'area', title: '深圳'},
      {type: 'area', title: '杭州'},
      {type: 'job', title: '产品类'},
      {type: 'job', title: '研发类'},
      {type: 'job', title: '营销类'},
      {type: 'job', title: '设计类'},
    ])
  }
})

module.exports = Model
