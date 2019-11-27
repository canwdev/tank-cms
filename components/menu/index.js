const {CODE_OK, CODE_CLIENT_ERR} = require("../../utils/common")
const {buildTree, sortTree} = require('../../utils')
const Menu = require('./MenuModel')
const Op = require('sequelize').Op
const memoryCache = require('memory-cache');
const MENU_CACHE = 'MENU_CACHE'

module.exports = {
  async list(req, res, next) {
    try {
      let menu

      // 利用缓存，避免每次都从数据库计算递归树
      const cachedMenu = memoryCache.get(MENU_CACHE)

      if (!cachedMenu) {
        const result = await Menu.findAll()
        const tree = sortTree(buildTree(result))

        await memoryCache.put(MENU_CACHE, tree)
        // console.log('load from db')
        menu = tree
      } else {
        // console.log('load from cache')
        menu = cachedMenu
      }

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

        // 删除缓存
        memoryCache.del(MENU_CACHE)

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

        // 删除缓存
        memoryCache.del(MENU_CACHE)

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
