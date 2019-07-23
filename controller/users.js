const User = require('../model/User')

module.exports = {

  async createUser(req, res, next) {
    try {

      let result = await User.create({
        username: 'canwdev',
        password: '123456',
        role: 'admin',
        avatar: 'https://ws3.sinaimg.cn/large/005BYqpgly1g5a471jw6lj307805cglr.jpg?referrer=https://cdn.sinaimg.cn.52ecy.cn'
      })

      return res.json({
        code: 0,
        message: '创建成功'
      })

    } catch (e) {
      return res.status(500).send()
    }
  }

}
