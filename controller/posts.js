// const db = require('../db/async-db')
const Post = require('../model/Post')

module.exports = {

  async listPosts(req, res, next) {
    try {
      // let result = await db.query('SELECT * FROM posts')
      let result = await Post.findAll()
      return res.json(result)
    } catch (e) {
      return res.status(500).send()
    }
  },

  async createPost(req, res, next) {
    try {

      const data = req.body
      // let result = await db.query('INSERT INTO posts(title, content) VALUES(?,?)', [data.title, data.content])
      let result = await Post.create({
        title: data.title,
        content: data.content
      })
      return res.json({
        code: 0,
        message: '创建成功'
      })

    } catch (e) {
      return res.status(500).send(e)
    }
  }
}
