const {CODE_OK, CODE_CLIENT_ERR} = require("../../utils/common")
const Menu = require('./MenuModel')
const Op = require('sequelize').Op
const {getMenuTree, delMenuTreeCache} = require('./common')

module.exports = {
  async list(req, res) {
    try {
      const menu = await getMenuTree()

      return res.json({
        code: CODE_OK,
        data: menu
      })
    } catch (e) {
      console.error(e)
      return res.status(500).send()
    }
  },
  async update(req, res) {
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
    } catch (e) {
      console.error(e)
      return res.status(500).send(e.message)
    }
  },
  async delete(req, res) {
    const {id} = req.query

    try {
      if (!id) {
        return res.json({code: CODE_CLIENT_ERR})
      }

      await Menu.destroy({
        where: {
          [Op.or]: [{id}, {pid: id}]
        }
      })

      return res.json({code: CODE_OK})
    } catch (e) {
      console.error(e)
      return res.status(500).send(e.message)
    }
  }
}
