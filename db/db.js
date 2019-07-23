// MySQL 操作封装
const mysql = require('mysql');
const dbConfig = require('./config')

const query = function(sql, params, callback) {
  //每次使用的时候需要创建链接，数据操作完成之后要关闭连接
  const connection = mysql.createConnection(dbConfig)
  connection.connect(function (err) {
    if (err) {
      console.error('数据库连接失败: ' + err.stack);
      throw err;
    }
    // console.warn('数据库连接成功 id ' + connection.threadId);
  })

  connection.query(sql, params, function(err, results, fields) {
    if (err) {
      console.log('数据库操作失败', err);
      throw err;
    }

    // 执行回调函数
    // results作为数据操作后的结果，fields作为数据库连接的一些字段
    callback && callback(results, fields);

    // 结束连接
    connection.end(function(err) {
      if (err) {
        console.log('关闭数据库连接失败', err);
        throw err;
      }
    })
  })
}

module.exports = {query}

//查
// connection.query('SELECT * FROM t_f_faq', function (err, result) {
//   if(err){
//     console.log('[SELECT ERROR] - ',err.message);
//     return;
//   }

//  console.log('--------------------------SELECT----------------------------');
//  console.log(result);
//  console.log('------------------------------------------------------------\n\n');
// });
// connection.end();
