const Sequelize = require('sequelize')
const seq = require('../../db/sequelize')

let Model = seq.define('banner', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  img: Sequelize.STRING,
  desc: Sequelize.STRING,
  url: Sequelize.STRING,
  hidden: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  priority: {
    type: Sequelize.BIGINT(11),
    defaultValue: 1,
    allowNull: false
  },
}, {timestamps: false})

Model.sync().then(async function () {
  const count = await Model.count()
  if (count === 0) {
    return Model.create({
      title: 'Banner 标题',
      desc: 'Description',
      img: 'https://api.neweb.top/bing.php',
      url: 'https://cn.bing.com/'
    })
  }
})

module.exports = Model
