const Settings = require('./SettingsModel')
const {getMenuTree} = require('../menu/common')
const pkg = require('../../package')

module.exports = {
  async index(req, res, next) {
    try {
      let result = await Settings.findAll({
        where: {type: 'website'}
      })

      const websiteInfo = {}
      result.forEach(v => {
        websiteInfo[v.key] = v.value
      })

      const menu = await getMenuTree()

      return res.sendSuccess({
        message: '请求成功',
        data: {
          vendor: {
            name: pkg.name,
            author: pkg.author,
            version: pkg.version,
          },
          websiteInfo,
          menu
        }
      })

    } catch (error) {
      next(error)
    }
  }
}
