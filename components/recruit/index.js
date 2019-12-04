const RecuritType = require('./RecruitTypeModel')
const Recurit = require('./RecruitModel')
const Op = require('sequelize').Op

// Recurit.bulkCreate(require('./fake-data/dist'))

module.exports = {
  async list(req, res, next) {

    try {
      const {showAll} = req.query

      const jobs = await Recurit.findAll(showAll ? {} : {
        where: {
          hidden: {
            [Op.ne]: 1
          }
        },
      })

      const jobTypes = await RecuritType.findAll()


      return res.sendSuccess({
        data: {
          jobs: jobs.sort((a, b) => a.priority - b.priority),
          jobTypes
        }
      })
    } catch (e) {
      next(e)
    }
  },
}
