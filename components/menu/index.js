const {CODE_OK, CODE_CLIENT_ERR} = require("../../utils/common")
const Menu = require('./MenuModel')
const Op = require('sequelize').Op
const {getMenuTree, delMenuTreeCache} = require('./common')
const {handleCustomError} = require('../../utils')

module.exports = {
  async list(req, res, next) {
    try {
      const menu = await getMenuTree()

      return res.json({
        code: CODE_OK,
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

        return res.json({
          code: CODE_OK,
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

        return res.json({
          code: CODE_OK,
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
        return handleCustomError({res})
      }

      await Menu.destroy({
        where: {
          [Op.or]: [{id}, {pid: id}]
        }
      })

      return res.json({code: CODE_OK})
    } catch (error) {
      next(error)
    }
  }
}
