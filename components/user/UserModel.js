const Sequelize = require('sequelize')
const seq = require('../../db/sequelize')

let UserModel = seq.define('user', {
  id: {
    type: Sequelize.BIGINT(),
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
    type: Sequelize.STRING(500),
    allowNull: false,
    comment: '密码',
    set(val) {
      this.setDataValue('password', require('bcrypt').hashSync(val, 10));
    }
  },
  role: {
    type: Sequelize.STRING(50),
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
UserModel.sync({
  force: false
}).then(async function () {

  const count = await UserModel.count()
  // if empty create a user
  if (count === 0) {
    return UserModel.create({
      username: 'admin',
      password: 'admin',
      role: 'admin',
      nickname: 'SuperAdmin',
      avatar: 'https://ws3.sinaimg.cn/large/005BYqpgly1g5a3hkxtrlj30lc0lcgv2.jpg'
    })
  }

})

module.exports = UserModel
