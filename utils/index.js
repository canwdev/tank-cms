const fs = require('fs')
const path = require('path')

function pad2Zero(val) {
  return val.toString().padStart(2, '0')
}

/**
 * 用日期时间格式化文件名
 * @param prefix 前缀
 * @param originalname 原文件名
 * @returns {string}
 */
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

/**
 * 递归遍历文件夹 https://stackoverflow.com/a/5827895
 * @param dir
 * @param done
 */
function walkDir(dir, done) {
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
          walkDir(file, function (err, res) {
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

/**
 * 生成树
 * @param data [{"id": 1, "title": "首页", "pid": 0, "priority": 1}, {"id": 2, "title": "关于我们", "pid": 0, "priority": 2}, {"id": 3,  "title": "关于",  "pid": 2, "priority": 2}, {"id": 4,  "title": "联系我们",  "pid": 2, "priority": 1},]
 * @returns {array}
 */
function buildTree(data) {
  data = JSON.parse(JSON.stringify(data))
  const tree = new Map()

  data.forEach(item => {
    if (tree.has(item.pid)) {
      tree.get(item.pid).push(item)
    } else {
      tree.set(item.pid, [item])
    }
  })

  data.forEach(item => {
    if (tree.has(item.id)) {
      item.children = tree.get(item.id)
    }
  })

  return tree.get(0)
}

/**
 * 递归排序树
 * @param node 由 buildTree 生成的树
 * @returns {array} 根据 priority 排序好的树
 */
function sortTree(node) {
  let result = []
  if (!node) return result

  result = node.sort((a, b) => a.priority - b.priority)

  for (let i = 0; i < node.length; i++) {
    if (node[i].children) {
      result[i].children = sortTree(node[i].children)
    }
  }
  return result
}

// Group by array of objects https://stackoverflow.com/a/34890276
function arrayGroupBy(arr, key) {
  return arr.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {})
}

/*function groupBy1(xs, key, addKey) {
  return xs.reduce(function (pre, cur, i) {
    var groupName = cur[key]
    var num = Number(cur[addKey]) || 0
    if (!pre[groupName]) {
      pre[groupName] = 0
    }
    pre[groupName] += num

    // console.log(i, pre, cur)
    // debugger
    return pre
  }, {})
}*/

module.exports = {
  formatFileNameWithDateTime,
  walk: walkDir,
  buildTree,
  sortTree,
  arrayGroupBy,
}
