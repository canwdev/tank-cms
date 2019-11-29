const Sequelize = require('sequelize')
const seq = require('../../db/sequelize')

let PostModel = seq.define('post', {
  id: {
    type: Sequelize.BIGINT(11),
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    allowNull: false
  },
  title: Sequelize.STRING,
  content: Sequelize.TEXT,
  author_ids: {
    type: Sequelize.STRING(200),
    comment: '文章作者id，若有多个作者，用半角逗号`,`隔开'
  },
  hidden: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  isMarkdown: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  // create_time: Sequelize.DATE,
  // update_time: Sequelize.DATE,
}, {timestamps: true})

PostModel.sync().then(async function () {
  const count = await PostModel.count()
  if (count === 0) {
    return PostModel.create({
      title: 'Hello World!',
      content: '欢迎使用Express。这是您的第一篇文章。编辑或删除它，然后开始写作吧！',
    })
  }

})


module.exports = PostModel
