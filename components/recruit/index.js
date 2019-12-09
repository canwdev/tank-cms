const RecruitType = require('./RecruitTypeModel')
const Recruit = require('./RecruitModel')
const Op = require('sequelize').Op
const {arrayGroupBy} = require('../../utils')
const {searchGenerator} = require('../../db/sequelize-utils')

// 批量生成 Demo 数据
// Recruit.bulkCreate(require('./fake-data/dist'))

module.exports = {
  async types(req, res, next) {
    try {
      const {grouped} = req.query
      const types = await RecruitType.findAll()

      return res.sendSuccess({
        data: grouped ? arrayGroupBy(JSON.parse(JSON.stringify(types)), 'type') : types
      })
    } catch (e) {
      next(e)
    }
  },
  async list(req, res, next) {

    try {
      const {showAll, jobsOnly, offset, limit} = req.query

      const showAllQuery = showAll ? {} : {hidden: {[Op.ne]: 1}}
      let paginationQuery = limit ? {
        offset: parseInt(offset) || 0,
        limit: parseInt(limit),
      } : {}

      const jobsResult = await Recruit.findAndCountAll({
        where: {
          ...showAllQuery,
        },
        ...paginationQuery,
        order: [
          ['priority', 'ASC']
        ],
      })

      const jobs = jobsResult.rows

      if (jobsOnly) {
        return res.sendSuccess({
          data: jobs,
          count: jobsResult.count
        })
      }

      const jobTypes = await RecruitType.findAll()


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
    try {
      const data = req.body
      if (data.id) {
        // 按 id 修改
        await Recruit.update(
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
        await Recruit.create({
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
  async delete(req, res, next) {
    try {
      const {id} = req.query
      if (!id) return res.sendError({message: 'id 不能为空'})

      await Recruit.destroy({
        where: {id}
      })

      return res.sendSuccess()
    } catch (error) {
      next(error)
    }
  },
  async find(req, res, next) {
    try {
      const {
        showAll, offset, limit,
        title,
        desc,
        t_category_id,
        t_area_id,
        t_job_id,
        hidden,
        priority
      } = req.query

      const showAllQuery = showAll ? {} : {hidden: {[Op.ne]: 1}}
      let paginationQuery = limit ? {
        offset: parseInt(offset) || 0,
        limit: parseInt(limit),
      } : {}

      const search = searchGenerator([
        {label: 'title', value: title},
        {label: 'desc', value: desc},
        {label: 't_category_id', value: t_category_id},
        {label: 't_area_id', value: t_area_id},
        {label: 't_job_id', value: t_job_id},
        // {label: 'hidden', value: hidden === 'true' ? 1 : 0},
        {label: 'priority', value: priority},
      ])

      const result = await Recruit.findAndCountAll({
        where: {
          ...showAllQuery,
          ...search
        },
        ...paginationQuery,
        order: [
          ['priority', 'ASC']
        ]
      })

      return res.sendSuccess({
        data: result.rows,
        count: result.count
      })
    } catch (e) {
      next(e)
    }
  }
}
