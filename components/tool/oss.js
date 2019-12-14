const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

let config = null
try {
  const info = fs.readFileSync(path.join(__dirname, 'oss_config.json'), {encoding: 'utf8'})
  config = JSON.parse(info)
} catch (e) {
  console.warn('OSS 模块异常：', e.message)
}

module.exports = {
  async getOssPolicy(req, res, next) {
    try {
      if (!config) return next(new Error('读取OSS配置失败'))

      const dirPath = 'testOSS/' // 上传后例子：http://cqq.oss-cn-shenzhen.aliyuncs.com/testOSS/1489388301901，若为空，上传的文件则放到object的根目录

      const OSSAccessKeyId = config.OSSAccessKeyId || '【这里填你阿里云的Access Key ID】'
      const secret = config.secret || '【这里填你阿里云的Access Key Secret】'
      const host = config.host || '【填你自己阿里云OSS的外网域名】' // http://cqq.oss-cn-shenzhen.aliyuncs.com

      let now = new Date().getTime()
      let end = now + 300000
      let expiration = new Date(end).toISOString()
      let policyString = {
        expiration,
        conditions: [
          ['content-length-range', 0, 1048576000],
          ['starts-with', '$key', dirPath]
        ]
      }
      policyString = JSON.stringify(policyString)
      const policy = new Buffer(policyString).toString('base64')
      const signature = crypto.createHmac('sha1', secret).update(policy).digest('base64')
      res.sendSuccess({
        data: {
          OSSAccessKeyId,
          host,
          policy,
          signature,
          saveName: now, // 此项不是必要的
          startsWith: dirPath
        }
      })

    } catch (error) {
      next(error)
    }
  }
}
