const {handleServerError} = require('../../utils')
const {CODE_OK} = require('../../utils/common')
const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

module.exports = {
  async getOssPolicy(req, res) {
    try {

      const dirPath = 'testOSS/' // 上传后例子：http://cqq.oss-cn-shenzhen.aliyuncs.com/testOSS/1489388301901，若为空，上传的文件则放到object的根目录

      const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'oss_config.json'), {encoding: 'utf8'}))

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
      res.json({
        code: CODE_OK,
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
      handleServerError({res, error})
    }
  }
}
