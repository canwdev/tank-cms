// const db = require('../db/async-db')
const Op = require('sequelize').Op
const Post = require('./PostModel')
const User = require('../user/UserModel')
const striptags = require('striptags')  // 去除HTML标签
// const showdown  = require('showdown')

module.exports = {

  async list(req, res, next) {
    try {

      let offset, limit
      if (req.query.limit) {
        offset = req.query.offset || 0
        limit = req.query.limit

        offset = parseInt(offset)
        limit = parseInt(limit)
      }

      // console.log(offset, limit)

      // let result = await db.query('SELECT * FROM posts')
      let result = await Post.findAndCountAll({
        where: {
          hidden: {
            [Op.ne]: 1
          }
        },
        offset,
        limit,
        order: [
          ['id', 'DESC']
        ],
      })


      return res.sendSuccess({
        data: {
          count: result.count,
          rows: result.rows.map(v => {
            v.content = striptags(v.content.slice(0, 200))
            return v
          })
        }
      })
    } catch (error) {
      next(error)
    }
  },

  async detail(req, res, next) {
    try {
      const id = req.query.id

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

      const data = req.body

      if (data.editMode && data.id) {
        await Post.update(
          {
            title: data.title,
            content: data.content,
            author_ids: user_id,
            isMarkdown: data.isMarkdown
          },
          {
            where: {id: data.id}
          }
        )

        return res.sendSuccess({
          message: '更新成功'
        })
      }
      // let result = await db.query('INSERT INTO posts(title, content) VALUES(?,?)', [data.title, data.content])
      let result = await Post.create({
        title: data.title,
        content: data.content,
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
    const id = req.query.id

    try {
      if (!id) {
        return res.sendError({message: 'id 不能为空'})
      }
      await Post.destroy({
        where: {id}
      })

      return res.sendSuccess()
    } catch (error) {
      next(error)
    }
  }
}
