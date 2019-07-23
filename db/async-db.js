const mysql = require('mysql')
const pool = mysql.createPool(require('./config'))

let query = function (sql, params) {
  return new Promise((resove, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err)
        return
      }

      connection.query(sql, params, (err, results, fields) => {
        if (err) {
          reject(err)
          return
        }

        resove(results)
        connection.release()
      })

    })
  })
}

module.exports = { query }
