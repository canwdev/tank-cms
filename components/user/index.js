const User = require('./UserModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {
  JWT_TOKEN,
  JWT_TOKEN_EXPIRE,
  CODE_CLIENT_FORBIDDEN,
  CODE_TOKEN_EXPIRE
} = require('../../utils/common')

module.exports = {

  async createUser(req, res, next) {
    try {

      await User.create({
        username: 'canwdev',
        password: '123456',
        role: 'admin',
        avatar: '/upload/avatar.jpg'
      })

      return res.sendSuccess({
        message: '创建成功'
      })

    } catch (error) {
      next(error)
    }
  },

  async login(req, res, next) {

    const data = req.body

    try {
      if (!data.username || !data.password) {
        return res.sendError({message: '缺少用户名或密码'})
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
        return res.sendError({message: '用户名或密码错误'})
      }

      // 生成 token
      // jwt.sign() 接受两个参数，一个是传入的对象，一个是自定义的密钥
      const token = jwt.sign({id: String(user.id)}, JWT_TOKEN, {
        expiresIn: JWT_TOKEN_EXPIRE
      })

      const retUser = Object.assign({}, user.dataValues)
      // 移除敏感信息
      delete retUser.password
      retUser.token = token

      return res.sendSuccess({
        message: '登录成功！',
        data: retUser
      })

    } catch (error) {
      next(error)
    }
  },

  async logout(req, res, next) {
    try {
      const id = req.__userid

      return res.sendSuccess({
        data: id
      })

    } catch (error) {
      next(error)
    }
  },

  /**
   * 检查用户是否登录，若登录则并返回用户信息
   */
  async getUserInfo(req, res, next) {
    const data = req.query

    const hostUrl = '//' + req.headers.host

    try {
      const token = data.token
      if (!token) {
        return res.sendError({message: 'token格式错误'})
      }

      const raw = String(token)
      const {id} = jwt.verify(raw, JWT_TOKEN)
      const user = await User.findOne({
        where: {id}
      })

      if (!user) {
        return res.sendError({
          code: CODE_CLIENT_FORBIDDEN,
          message: 'token验证失败 (1)'
        })
      }

      const retUser = Object.assign({}, user.dataValues)
      // 移除敏感信息
      delete retUser.password
      retUser.token = token
      retUser.avatar = hostUrl + retUser.avatar
      return res.sendSuccess({
        data: retUser
      })
    } catch (error) {
      console.error(error.message)

      if (error.message === 'jwt expired') {
        return res.sendError({
          code: CODE_TOKEN_EXPIRE,
          message: '登录状态过期，请重新登录'
        })
      }

      return res.sendError({
        code: CODE_CLIENT_FORBIDDEN,
        message: 'token验证失败 (2)'
      })
    }
  }

}
