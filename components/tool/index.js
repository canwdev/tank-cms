const fs = require('fs')
const path = require('path')
const bcrypt = require('bcrypt')
const Settings = require('./SettingsModel')
const Hitokoto = require('./HitokotoModel')
const {CODE_OK, UPLOAD_PATH, PUBLIC_PATH,CODE_CLIENT_ERR} = require('../../utils/common')
const utils = require('../../utils')
const walk = utils.walk
const {handleServerError} = require('../../utils')
// const seq = require('../db/sequelize')

module.exports = {

  async encryptText(req, res) {
    try {
      const text = req.query.text
      const result = bcrypt.hashSync(text, 10)

      return res.json({
        code: CODE_OK,
        data: result
      })
    } catch (error) {
      handleServerError({res, error})
    }

  },

  async uploadFile(req, res) {
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
          code: CODE_OK,
          data: {
            path,
            host: req.headers.host
          }
        })
      })
    } catch (error) {
      handleServerError({res, error})
    }
  },

  async listUploadedFile(req, res) {
    try {
      walk(UPLOAD_PATH, function (err, results) {
        const length = PUBLIC_PATH.length

        const files = []
        // 去除文件系前面的路径，只保留web可访问的public路径
        results.forEach(v => {
          files.push(v.substring(length))
        })

        return res.json({
          code: CODE_OK,
          data: {
            files
          }
        })
      })

    } catch (error) {
      handleServerError({res, error})
    }
  },

  async deleteUploadedFile(req, res) {
    try {
      const fileName = req.body.fileName
      if (!fileName) throw 'Error: No fileName'

      const fullPath = path.join(UPLOAD_PATH + '/' + fileName)

      fs.unlink(fullPath, function (err) {
        if (err) return res.json({
          code: CODE_CLIENT_ERR,
          message: '文件不存在'
        })

        return res.json({
          code: CODE_OK
        })
      })
    } catch (error) {
      handleServerError({res, error})
    }
  },

  async getSettings(req, res) {
    try {
      let result = await Settings.findAll()

      return res.json({
        code: CODE_OK,
        data: result
      })

    } catch (error) {
      handleServerError({res, error})
    }
  },

  async setSettings(req, res) {
    const data = req.body

    try {
      if (!data.id && !data.key) return res.json({
        code: CODE_CLIENT_ERR,
        message: '缺少必要参数'
      })

      if (data.id) {
        // 按 id 修改
        await Settings.update(
          {
            key: data.key,
            value: data.value,
            type: data.type
          },
          {
            where: {id: data.id}
          }
        )

        return res.json({
          code: CODE_OK,
          message: '更新成功'
        })
      } else {
        // 创建新的
        await Settings.create({
          key: data.key,
          value: data.value,
          type: data.type
        })

        return res.json({
          code: CODE_OK,
          message: '设置保存成功！'
        })
      }
    } catch (error) {
      handleServerError({res, error})
    }
  },

  // 对外开放的前端爬虫数据接收接口
  async saveHitokoto(req, res) {
    const data = req.body

    try {
      data.key = data.id
      delete data.id

      data.value = data.hitokoto
      delete data.hitokoto


      await Hitokoto.create(data)

      return res.json({
        code: CODE_OK
      })

    } catch (error) {
      handleServerError({res, error})
    }
  },

  async queryHitokoto(req, res) {
    try {
      let result= await Hitokoto.findAndCountAll({
        offset: 0,
        limit: 10,
        // where: {
        //   type: 'hitokoto'
        // },
        // order: [
        //   [ seq.cast(seq.col('key'), 'UNSIGNED INTEGER') , 'ASC' ]
        // ],
        order: [
          ['id', 'DESC']
        ],
      })

      return res.json({
        code: CODE_OK,
        data: result
      })
    } catch (error) {
      handleServerError({res, error})
    }
  },

  async temp(req, res) {
    return res.json({
      code: CODE_OK,
      message: 'ok'
    })
  }
}
