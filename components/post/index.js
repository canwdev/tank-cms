// const db = require('../db/async-db')
const Op = require('sequelize').Op
const Post = require('./PostModel')
const User = require('../user/UserModel')
const striptags = require('striptags')  // 去除HTML标签
const {searchGenerator} = require('../../db/sequelize-utils')

// const showdown  = require('showdown')

function formatPostListRow(rows) {
  return rows.map(item => {
    item.content = striptags(item.content.slice(0, 200))
    return item
  })
}

module.exports = {
  async list(req, res, next) {
    try {
      const {showAll, offset, limit} = req.query

      const showAllQuery = showAll ? {} : {hidden: {[Op.ne]: 1}}
      let paginationQuery = limit ? {
        offset: parseInt(offset) || 0,
        limit: parseInt(limit),
      } : {}

      // let result = await db.query('SELECT * FROM posts')
      let result = await Post.findAndCountAll({
        where: {
          ...showAllQuery
        },
        ...paginationQuery,
        order: [
          ['priority', 'ASC'],
          ['id', 'DESC'],
        ]
      })


      return res.sendSuccess({
        data: {
          count: result.count,
          rows: formatPostListRow(result.rows)
        }
      })
    } catch (error) {
      next(error)
    }
  },
  async detail(req, res, next) {
    try {
      const {id} = req.query

      if (!id) {
        return res.json({
          code: 404,
          message: '请指定id！'
        })
      }

      const post = await Post.findOne({
        where: {
          id
        }
      })

      // 获取作者信息
      const author = await User.findOne({
        where: {
          id: post.author_ids
        }
      })
      post.author_ids = author.nickname

      // if (post.isMarkdown) {
      //   const converter = new showdown.Converter()
      //   post.content = converter.makeHtml(post.content)
      // }

      return res.sendSuccess({
        data: post
      })

    } catch (error) {
      next(error)
    }
  },
  async update(req, res, next) {
    try {
      // 获取中间件传来的值
      const user_id = req.__userid

      const {
        editMode, id,
        title,
        content,
        isMarkdown,
        hidden,
      } = req.body

      if (editMode && id) {
        await Post.update(
          {
            title,
            content,
            author_ids: user_id,
            isMarkdown,
            hidden
          },
          {
            where: {id}
          }
        )

        return res.sendSuccess({
          message: '更新成功'
        })
      }
      // let result = await db.query('INSERT INTO posts(title, content) VALUES(?,?)', [title, content])
      let result = await Post.create({
        title: title,
        content: content,
        author_ids: user_id
      })
      return res.sendSuccess({
        message: '创建成功',
        data: {
          id: result.id
        }
      })

    } catch (error) {
      next(error)
    }
  },
  async delete(req, res, next) {
    try {
      const {id} = req.query
      if (!id) return res.sendError({message: 'id 不能为空'})

      await Post.destroy({
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
        content,
      } = req.query

      let {
        timeStart, // 毫秒数
        timeEnd
      } = req.query

      const showAllQuery = showAll ? {} : {hidden: {[Op.ne]: 1}}
      let paginationQuery = limit ? {
        offset: parseInt(offset) || 0,
        limit: parseInt(limit),
      } : {}

      const search = searchGenerator([
        {label: 'title', value: title},
        {label: 'content', value: content}
      ])

      let timeQuery = {}
      if (timeStart && timeEnd) {
        timeStart = parseInt(timeStart)
        timeEnd = parseInt(timeEnd)

        timeQuery = {
          [Op.or]: {
            createdAt: {
              [Op.gt]: new Date(timeStart),
              [Op.lt]: new Date(timeEnd),
            },
            updatedAt: {
              [Op.gt]: new Date(timeStart),
              [Op.lt]: new Date(timeEnd),
            }
          }
        }
      }

      const result = await Post.findAndCountAll({
        where: {
          ...showAllQuery,
          ...search,
          ...timeQuery
        },
        ...paginationQuery,
        order: [
          ['priority', 'ASC'],
          ['id', 'DESC'],
        ]
      })

      return res.sendSuccess({
        data: formatPostListRow(result.rows),
        count: result.count
      })
    } catch (e) {
      next(e)
    }
  }
}
