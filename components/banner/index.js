const {CODE_OK} = require("../../utils/common")
const Banner = require('./BannerModel')
const Op = require('sequelize').Op

module.exports = {
  async list(req, res) {
    try {
      const result = await Banner.findAll({
        where: {
          hidden: {
            [Op.ne]: 1
          }
        },
      })

      return res.json({
        code: CODE_OK,
        data: result
      })
    } catch (e) {
      console.error(e)
      return res.status(500).send()
    }
  },
}
