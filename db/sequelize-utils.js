const Op = require('sequelize').Op

/**
 * 生成 Sequelize where 查询
 * Model.findAll({ where: {...searchGenerator(fields)} })
 * @param fields=[{label: 'title', value: title}]
 */
function searchGenerator(fields) {
  let ret = []
  fields.forEach(item => {
    ret.push({
      [item.label]: {
        [Op.like]: `%${item.value}%`
      }
    })
  })
  return {[Op.and]: ret}
}

module.exports = {
  searchGenerator
}
