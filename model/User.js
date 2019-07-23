const Sequelize = require('sequelize')
const seq = require('../db/sequelize')

let User = seq.define('user', {
  id: {
    type: Sequelize.BIGINT(11),
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    allowNull: false
  },
  username: {
    type: Sequelize.STRING(50),
    allowNull: false,
    unique: true,
    comment: '用户名'
  },
  password: {
    type: Sequelize.STRING(50),
    allowNull: false,
    comment: '密码'
  },
  role: {
    type: Sequelize.BIGINT(11),
    allowNull: false,
    comment: '角色'
  },
  nickname: {
    type: Sequelize.STRING(50),
    comment: '昵称'
  },
  avatar: {
    type: Sequelize.STRING(200),
    comment: '头像'
  }
})

// create will run when table not exists
User.sync({
  force: false
}).then(async function () {

  const count = await User.count()
  // if empty create a user
  if (count === 0) {
    return User.create({
      username: 'admin',
      password: 'admin',
      role: 'admin',
      nickname: 'SuperAdmin',
      avatar: 'https://ws3.sinaimg.cn/large/005BYqpgly1g5a3hkxtrlj30lc0lcgv2.jpg'
    })
  }

})

module.exports = User
