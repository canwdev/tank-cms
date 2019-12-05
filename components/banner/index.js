const Banner = require('./BannerModel')
const Op = require('sequelize').Op

module.exports = {
  async list(req, res, next) {

    try {
      const {showAll} = req.query

      const showAllQuery = showAll ? {} : {hidden: {[Op.ne]: 1}}

      const result = await Banner.findAll({
        where: {
          ...showAllQuery
        },
        order: [
          ['priority']
        ],
      })

      return res.sendSuccess({
        data: result
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

        return res.sendSuccess({
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

        return res.sendSuccess({
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
      if (!id) return res.sendError()

      await Banner.destroy({
        where: {id}
      })

      return res.sendSuccess()
    } catch (e) {
      next(e)
    }
  }
}
