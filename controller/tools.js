const fs = require('fs')
const path = require('path')
const bcrypt = require('bcrypt')
const Settings = require('../model/Settings')
const COMMON = require('../utils/common')
const OK = COMMON.CODE_OK
const utils = require('../utils')
const walk = utils.walk

module.exports = {

  async encryptText(req, res, next) {
    try {
      const text = req.query.text
      const result = bcrypt.hashSync(text, 10)

      return res.json({
        code: OK,
        data: result
      })
    } catch (e) {
      console.error(e)
      return res.status(500).send()
    }

  },

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
  },

  async deleteUploadedFile(req, res, next) {
    try {
      const fileName = req.body.fileName
      if (!fileName) throw 'Error: No fileName'

      const fullPath = path.join(COMMON.UPLOAD_PATH + '/' + fileName)

      fs.unlink(fullPath, function (err) {
        if (err) return res.json({
          code: COMMON.CODE_CLIENT_ERR,
          message: '文件不存在'
        })

        return res.json({
          code: OK
        })
      })
    } catch (e) {
      console.error(e)
      return res.status(500).send()
    }
  },

  async getSettings(req, res, next) {
    try {
      let result = await Settings.findAll()

      return res.json({
        code: OK,
        data: result
      })

    } catch (e) {
      console.error(e)
      return res.status(500).send(e.message)
    }
  },

  async setSettings(req, res, next) {
    const data = req.body

    try {
      if (!data.key) return res.json({
        code: COMMON.CODE_CLIENT_ERR,
        message: '缺少必要参数'
      })

      let result = await Settings.create({
        key: data.key,
        value: data.value,
        type: data.type
      })

      return res.json({
        code: OK,
        message: '设置保存成功！'
      })

    } catch (e) {
      console.error(e)
      return res.status(500).send(e.message)
    }
  }

}
