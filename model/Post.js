const Sequelize = require('sequelize')
const seq = require('../db/sequelize')

let Post = seq.define('post', {
  id: {
    type: Sequelize.BIGINT(11),
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    allowNull: false
  },
  title: Sequelize.STRING,
  content: Sequelize.TEXT,
  create_time: Sequelize.DATE,
  update_time: Sequelize.DATE,
}, {timestamps: false})

Post.sync().then(async function () {
  const count = await Post.count()
  if (count === 0) {
    return Post.create({
      title: 'Hello World!',
      content: '欢迎使用Express。这是您的第一篇文章。编辑或删除它，然后开始写作吧！',
    })
  }

})


module.exports = Post
