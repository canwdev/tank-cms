// const db = require('../db/async-db')
const Post = require('../model/Post')
const striptags = require('striptags')


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

      console.log(offset, limit)

      // let result = await db.query('SELECT * FROM posts')
      let result = await Post.findAndCountAll({
        offset,
        limit,
        order: [
          ['id', 'DESC']
        ],
      })



      return res.json({
        code: 0,
        data: {
          count: result.count,
          rows: result.rows.map(v => {
            v.content = striptags(v.content.slice(0, 200))
            return v
          })
        }
      })
    } catch (e) {
      console.error(e)
      return res.status(500).send()
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

      return res.json({
        code: 0,
        data: post
      })

    } catch (e) {
      return res.status(500).send()
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
            author_ids: user_id
          },
          {
            where: {id: data.id}
          }
        )

        return res.json({
          code: 0,
          message: '更新成功'
        })
      }
      // let result = await db.query('INSERT INTO posts(title, content) VALUES(?,?)', [data.title, data.content])
      let result = await Post.create({
        title: data.title,
        content: data.content,
        author_ids: user_id
      })
      return res.json({
        code: 0,
        message: '创建成功',
        data: {
          id: result.id
        }
      })

    } catch (e) {
      console.error(e)
      return res.status(500).send()
    }
  },

  async delete(req, res, next) {
    const id = req.query.id

    try {
      if (!id) {
        return res.json({code: 400})
      }
      let result = await Post.destroy({
        where: {id}
      })

      return res.json({code: 0})
    } catch (e) {
      console.error(e)
      return res.status(500).send()
    }
  }
}
