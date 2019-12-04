const fs = require('fs')
const path = require('path')
const bcrypt = require('bcrypt')
const Settings = require('./SettingsModel')
const Hitokoto = require('./HitokotoModel')
const {UPLOAD_PATH, PUBLIC_PATH} = require('../../utils/common')
const {formatFileNameWithDateTime, walk} = require('../../utils')
// const seq = require('../db/sequelize')

module.exports = {

  async encryptText(req, res, next) {
    try {
      const {text} = req.query

      if (!text) return res.sendError({message: 'text 不能为空！'})

      const result = bcrypt.hashSync(text, 10)
      return res.sendSuccess({data: result})
    } catch (error) {
      next(error)
    }

  },

  async uploadFile(req, res, next) {
    try {
      let file = req.file
      if (!file) {
        return res.sendError({message: "No file!"})
      }

      // file relative path
      let path = file.destination + formatFileNameWithDateTime('upload_', file.originalname)

      // save to file
      fs.rename(file.path, path, function (err) {
        if (err) return res.sendError({message: "Save file error!"})

        return res.sendSuccess({
          data: {
            path,
            host: req.headers.host
          }
        })
      })
    } catch (error) {
      next(error)
    }
  },

  async listUploadedFile(req, res, next) {
    try {
      walk(UPLOAD_PATH, function (err, results) {
        const length = PUBLIC_PATH.length

        const files = []
        // 去除文件系前面的路径，只保留web可访问的public路径
        results.forEach(v => {
          files.push(v.substring(length))
        })

        return res.sendSuccess({
          data: {
            files
          }
        })
      })

    } catch (error) {
      next(error)
    }
  },

  async deleteUploadedFile(req, res, next) {
    try {
      const fileName = req.body.fileName
      if (!fileName) return res.sendError({message: "No file name"})

      const fullPath = path.join(UPLOAD_PATH + '/' + fileName)

      fs.unlink(fullPath, function (err) {
        if (err) return res.sendError({message: "文件不存在"})

        return res.sendSuccess()
      })
    } catch (error) {
      next(error)
    }
  },

  async getSettings(req, res, next) {
    try {
      let result = await Settings.findAll()

      return res.sendSuccess({
        data: result
      })

    } catch (error) {
      next(error)
    }
  },

  async setSettings(req, res, next) {
    const data = req.body

    try {
      if (!data.id && !data.key) return res.sendError({message: '缺少必要参数'})

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

        return res.sendSuccess({
          message: '更新成功'
        })
      } else {
        // 创建新的
        await Settings.create({
          key: data.key,
          value: data.value,
          type: data.type
        })

        return res.sendSuccess({
          message: '设置保存成功！'
        })
      }
    } catch (error) {
      next(error)
    }
  },

  // 对外开放的前端爬虫数据接收接口
  async saveHitokoto(req, res, next) {
    const data = req.body

    try {
      data.key = data.id
      delete data.id

      data.value = data.hitokoto
      delete data.hitokoto


      await Hitokoto.create(data)

      return res.sendSuccess()

    } catch (error) {
      next(error)
    }
  },

  async queryHitokoto(req, res, next) {
    try {
      let result = await Hitokoto.findAndCountAll({
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

      return res.sendSuccess({
        data: result
      })
    } catch (error) {
      next(error)
    }
  },

  async temp(req, res, next) {
    return res.sendSuccess({
      message: 'ok'
    })
  }
}
