const User = require('../model/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const COMMON = require('../utils/common')
const OK = COMMON.CODE_OK

module.exports = {

  async createUser(req, res, next) {
    try {

      let result = await User.create({
        username: 'canwdev',
        password: '123456',
        role: 'admin',
        avatar: '/upload/avatar.jpg'
      })

      return res.json({
        code: OK,
        message: '创建成功'
      })

    } catch (e) {
      return res.status(500).send('创建失败！')
    }
  },

  async login(req, res, next) {

    const data = req.body

    try {
      if (!data.username || !data.password) {
        return res.json({
          code: 400,
          message: '缺少用户名或密码'
        })
      }

      const user = await User.findOne({
        where: {username: data.username},
        // attributes: { exclude: ['password'] }
      })

      // bcrypt.compareSync 解密匹配
      const isPasswordValid = bcrypt.compareSync(
        data.password,
        user.password
      )
      if (!isPasswordValid) {
        return res.send({
          code: 400,
          message: '用户名或密码错误'
        })
      }

      // 生成 token
      // jwt.sign() 接受两个参数，一个是传入的对象，一个是自定义的密钥
      const token = jwt.sign({ id: String(user.id) }, COMMON.JWT_TOKEN, {
        expiresIn: COMMON.JWT_TOKEN_EXPIRE
      })

      const retUser = Object.assign({}, user.dataValues)
      // 移除敏感信息
      delete retUser.password
      retUser.token = token

      return res.json({
        code: OK,
        message: '登录成功！',
        data: retUser
      })

    } catch (e) {
      console.error(e)
      return res.status(500).send()
    }
  },

  async logout(req, res, next) {
    try {
      const id = req.__userid

      return res.json({
        code: OK,
        data: id
      })

    } catch (e) {
      console.log(e)
      return res.status(500).send()
    }
  },

  /**
   * 检查用户是否登录，若登录则并返回用户信息
   */
  async getUserInfo(req, res, next) {
    const data = req.query

    const hostUrl = 'http://' + req.headers.host

    try {
      const token = data.token
      if (!token) {
        return res.json({
          code: 400,
          message: 'token格式错误'
        })
      }

      const raw = String(token)
      const { id } = jwt.verify(raw, COMMON.JWT_TOKEN)
      const user = await User.findOne({
        where: {id}
      })

      if (!user) {
        return res.json({
          code: 403,
          message: 'token验证失败 (1)'
        })
      }

      const retUser = Object.assign({}, user.dataValues)
      // 移除敏感信息
      delete retUser.password
      retUser.token = token
      retUser.avatar = hostUrl + retUser.avatar
      return res.json({
        code: OK,
        data: retUser
      })
    } catch (e) {
      console.error(e.message)

      if (e.message === 'jwt expired') {
        return res.json({
          code: COMMON.CODE_TOKEN_EXPIRE,
          message: '登录状态过期，请重新登录'
        })
      }

      return res.json({
        code: 403,
        message: 'token验证失败 (2)'
      })
    }
  }

}
