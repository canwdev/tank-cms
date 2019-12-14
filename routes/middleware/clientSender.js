const { CODE_OK, CODE_CLIENT_ERR } = require('../../utils/common')

/**
 * 统一处理客户端返回 CODE
 */
module.exports = async function clientSender(req, res, next) {
  res.sendSuccess = ({ message, data, count } = {}) => {
    return res.json({
      code: CODE_OK,
      message,
      data,
      count
    })
  }

  res.sendError = ({ message, code = CODE_CLIENT_ERR } = {}) => {
    return res.json({
      code,
      message: message || 'Error: ' + code
    })
  }

  req._getHostUrl = () => {
    return req.protocol + '://' + req.get('host') // + req.originalUrl
  }

  next()
}
