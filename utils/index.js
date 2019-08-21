const fs = require('fs')
const path = require('path')

function pad2Zero(val) {
  return val.toString().padStart(2, '0')
}

function formatFileNameWithDateTime(prefix, originalname) {
  originalname = originalname.toLowerCase()
  // save file name as datetime
  let suffix = originalname.slice(originalname.lastIndexOf('.'))
  let now = new Date()
  return prefix +
    now.getFullYear() +
    pad2Zero(now.getMonth() + 1) +
    pad2Zero(now.getDate()) +
    pad2Zero(now.getHours()) +
    pad2Zero(now.getMinutes()) +
    pad2Zero(now.getSeconds()) +
    suffix
}

module.exports = {
  formatFileNameWithDateTime,
  /**
   * https://stackoverflow.com/a/5827895
   * @param dir
   * @param done
   */
  walk: function walk(dir, done) {
    console.log(dir)

    let results = []
    fs.readdir(dir, function (err, list) {
      if (err) return done(err)

      let pending = list.length
      if (!pending) return done(null, results)

      list.forEach(function (file) {
        file = path.resolve(dir, file)

        fs.stat(file, function (err, stat) {
          if (stat && stat.isDirectory()) {
            walk(file, function (err, res) {
              results = results.concat(res)
              if (!--pending) done(null, results)
            })
          } else {
            results.push(file)
            if (!--pending) done(null, results)
          }
        })
      })
    })
  }
}
