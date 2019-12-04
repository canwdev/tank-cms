const Sequelize = require('sequelize')
const seq = require('../../db/sequelize')
const {arrayGroupBy} = require('../../utils')

let Model = seq.define('recruit', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  desc: Sequelize.TEXT,
  t_category_id: Sequelize.BIGINT(),
  t_area_id: Sequelize.BIGINT(),
  t_job_id: Sequelize.BIGINT(),
  hidden: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  priority: {
    type: Sequelize.BIGINT(),
    defaultValue: 1,
    allowNull: false
  },
}, {timestamps: true})



Model.sync().then(async function () {
  const count = await Model.count()

  if (count === 0) {
    // FIXME: 当 RecruitType 没有创建时可能报错
    // 获取初始类别 id
    const RecruitType = require('./RecruitTypeModel')
    let types = await RecruitType.findAll()
    types = JSON.parse(JSON.stringify(types))
    const typesGrouped = arrayGroupBy(types, 'type')
    // console.log(typesGrouped)

    return Model.create({
      title: '驱动工程师',
      desc: '<h3>职位描述：</h3><p>1、参与系统调试工作，定位、解决发现的问题；</p>',
      t_category_id: typesGrouped.category[0].id,
      t_area_id: typesGrouped.area[0].id,
      t_job_id: typesGrouped.job[0].id
    })
  }
})

module.exports = Model
