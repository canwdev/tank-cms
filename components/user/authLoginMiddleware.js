const jwt = require('jsonwebtoken')
const JWT_TOKEN = require('../../utils/common').JWT_TOKEN
const COMMON = require('../../utils/common')
const User = require('./UserModel')

/**
 * 验证登录中间件
 * 需要验证的路由，需要在请求头加入 authorization 字段，值为登录成功获取的token
 * 会向下级传递 __userid 作为登录用户的id
 */
module.exports = async function authLogin(res, req, next) {
  // 必须先登录
  try {
    // 这很奇怪，貌似也只能这样获取值
    res = res.res
    req = req.req

    let token = req.headers.authorization
    if (token) {
      const raw = String(token)
      const {id} = jwt.verify(raw, JWT_TOKEN)

      const user = await User.findOne({
        where: {id}
      })

      if (!user) return res.status(COMMON.CODE_CLIENT_FORBIDDEN).send({
        code: COMMON.CODE_CLIENT_FORBIDDEN,
        message: '登录状态过期，请重新登录！'
      })

      // 向下一级传值
      req.__userid = id
      next()
    } else {
      return res.status(COMMON.CODE_CLIENT_FORBIDDEN).send({
        code: COMMON.CODE_CLIENT_FORBIDDEN,
        message: '请先登录!'
      })
    }
  } catch (e) {
    console.log(e)

    if (e.message === 'jwt expired') {
      return res.json({
        code: COMMON.CODE_TOKEN_EXPIRE,
        message: '登录状态过期，请重新登录'
      })
    }

    return res.status(500).send('验证登录状态失败')
  }
}
