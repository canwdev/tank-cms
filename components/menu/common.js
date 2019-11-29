const Menu = require('./MenuModel')
const {buildTree, sortTree} = require('../../utils')
const memoryCache = require('memory-cache');
const MENU_CACHE = 'MENU_CACHE'

module.exports = {
  /**
   * 查询 Menu 数据，并构建 MenuTree
   */
  async getMenuTree() {
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

    return menu
  },
  /**
   * 删除 MenuTree 缓存
   */
  delMenuTreeCache() {
    memoryCache.del(MENU_CACHE)
  }
}
