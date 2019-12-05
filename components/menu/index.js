const Menu = require('./MenuModel')
const Op = require('sequelize').Op
const {getMenuTree, delMenuTreeCache} = require('./common')

module.exports = {
  async list(req, res, next) {
    try {
      const menu = await getMenuTree()

      return res.sendSuccess({
        data: menu
      })
    } catch (error) {
      next(error)
    }
  },
  async update(req, res, next) {
    try {
      const {id, title, pid, url, priority} = req.body

      if (id) {
        // 编辑

        await Menu.update(
          {
            title, pid, url, priority
          },
          {
            where: {id}
          }
        )

        delMenuTreeCache()

        return res.sendSuccess({
          message: '更新成功'
        })

      } else {
        // 新增

        let result = await Menu.create({
          title: title,
          pid: pid || 0,
          url: url,
          priority: priority || 1,
        })

        delMenuTreeCache()

        return res.sendSuccess({
          message: '创建成功',
          data: {
            id: result.id
          }
        })

      }
    } catch (error) {
      next(error)
    }
  },
  async delete(req, res, next) {
    const {id} = req.query

    try {
      if (!id) {
        return res.sendError()
      }

      await Menu.destroy({
        where: {
          [Op.or]: [{id}, {pid: id}]
        }
      })

      delMenuTreeCache()

      return res.sendSuccess()
    } catch (error) {
      next(error)
    }
  }
}
