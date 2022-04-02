//导报 数据库
const mysql=require('mysql');

//创建数据库对象
const db=mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'12345678',
    database:'my_db_01'
})

//将数据库导出
module.exports=db;