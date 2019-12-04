const {CODE_OK, CODE_CLIENT_ERR} = require("../../utils/common")
const {handleCustomError} = require("../../utils")
const Banner = require('./BannerModel')
const Op = require('sequelize').Op

module.exports = {
  async list(req, res, next) {

    try {
      const {showAll} = req.query

      const result = await Banner.findAll(showAll ? {} : {
        where: {
          hidden: {
            [Op.ne]: 1
          }
        },
      })

      return res.json({
        code: CODE_OK,
        data: result.sort((a, b) => a.priority - b.priority)
      })
    } catch (e) {
      next(e)
    }
  },

  async update(req, res, next) {
    const data = req.body

    try {

      if (data.id) {
        // 按 id 修改
        await Banner.update(
          {
            title: data.title,
            img: data.img,
            desc: data.desc,
            url: data.url,
            hidden: data.hidden,
            priority: data.priority,
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
        await Banner.create({
          title: data.title,
          img: data.img,
          desc: data.desc,
          url: data.url,
          hidden: data.hidden,
          priority: data.priority,
        })

        return res.json({
          code: CODE_OK,
          message: '设置保存成功！'
        })
      }
    } catch (e) {
      next(e)
    }
  },

  async delete(req, res, next) {
    const {id} = req.query

    try {
      if (!id) return handleCustomError({res})

      await Banner.destroy({
        where: {id}
      })

      return res.json({code: CODE_OK})
    } catch (e) {
      next(e)
    }
  }
}
