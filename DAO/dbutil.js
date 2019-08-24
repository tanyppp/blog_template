const mysql = require('mysql');

function createConnection () {
  return mysql.createConnection({
    // 根据自己的mysql进行修改
    host: '192.168.1.103',
    port: '3306',
    user: 'root',
    password: 'monkey123',
    database: 'my_blog'
  })
}

module.exports = createConnection
