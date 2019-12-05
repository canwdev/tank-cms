const RecuritType = require('./RecruitTypeModel')
const Recurit = require('./RecruitModel')
const Op = require('sequelize').Op
const {arrayGroupBy} = require('../../utils')

// Recurit.bulkCreate(require('./fake-data/dist'))

module.exports = {
  async types(req, res, next) {
    try {
      const {grouped} = req.query
      const types = await RecuritType.findAll()

      return res.sendSuccess({
        data: grouped ? arrayGroupBy(JSON.parse(JSON.stringify(types)), 'type') : types
      })
    } catch (e) {
      next(e)
    }
  },
  async list(req, res, next) {

    try {
      let {showAll, jobsOnly, offset, limit} = req.query

      let showAllQuery = showAll ? {} : {hidden: {[Op.ne]: 1}}

      let paginationQuery = {}
      if (limit) {
        offset = parseInt(offset) || 0
        limit = parseInt(limit)
        paginationQuery = {
          offset,
          limit,
        }
      }

      const jobsResult = await Recurit.findAndCountAll({
        where: {
          ...showAllQuery,
        },
        ...paginationQuery
      })

      const jobs = jobsResult.rows.sort((a, b) => a.priority - b.priority)

      if (jobsOnly) {
        return res.sendSuccess({
          data: jobs,
          count: jobsResult.count
        })
      }

      const jobTypes = await RecuritType.findAll()


      return res.sendSuccess({
        data: {
          jobs,
          jobTypes
        }
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
        await Recurit.update(
          {
            title: data.title,
            desc: data.desc,
            t_category_id: data.t_category_id,
            t_area_id: data.t_area_id,
            t_job_id: data.t_job_id,
            hidden: data.hidden,
            priority: data.priority,
          },
          {
            where: {id: data.id}
          }
        )

        return res.sendSuccess()
      } else {
        // 创建新的
        await Recurit.create({
          title: data.title,
          desc: data.desc,
          t_category_id: data.t_category_id,
          t_area_id: data.t_area_id,
          t_job_id: data.t_job_id,
          hidden: data.hidden,
          priority: data.priority,
        })

        return res.sendSuccess()
      }
    } catch (e) {
      next(e)
    }
  },
}
