const fs = require('fs')
const COMMON = require('../utils/common')
const OK = COMMON.CODE_OK
const utils = require('../utils')
const walk = utils.walk

module.exports = {

  async uploadFile(req, res, next) {
    try {
      let file = req.file
      if (!file) {
        throw "No file!"
      }

      // file relative path
      let path = file.destination + utils.formatFileNameWithDateTime('upload_', file.originalname)

      // save to file
      fs.rename(file.path, path, function (err) {
        if (err) throw "Save file error!"

        return res.json({
          code: OK,
          data: {
            path,
            host: req.headers.host
          }
        })
      })
    } catch (e) {
      console.error(e)
      return res.status(500).send()
    }
  },

  async listUploadedFile(req, res, next) {
    try {
      walk(COMMON.UPLOAD_PATH, function (err, results) {
        const publicPath = COMMON.PUBLIC_PATH
        const length = publicPath.length

        const files = []
        // 去除文件系前面的路径，只保留web可访问的public路径
        results.forEach(v => {
          files.push(v.substring(length))
        })

        return res.json({
          code: OK,
          data: {
            files
          }
        })
      })

    } catch (e) {
      console.error(e)
      return res.status(500).send()
    }
  }

}
