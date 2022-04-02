//导入数据库模块
const db = require('../db/index')
//导入数据加密模块
const bcryptjs = require("bcryptjs");
//导入包 作用是生成token数据
const jwt = require('jsonwebtoken');
//导入包 作用是获取生存token的密匙
const config = require('../config')


//注册处理函数**************************************************************************
//注册处理函数**************************************************************************
exports.regUser = (req, res) => {
    //判断用户姓名密码 不能为空 为空提示 登陆失败*******************************************
    //接受请求方数据
    const userinfo = req.body;

    //对用户名查重的操作*****************************************************************
    //定义sql语句
    const sqlstr1 = 'select * from ev_users where username=?'
    //检查
    db.query(sqlstr1, userinfo.username, function (err, result) {
        //若错误
        if (err) {
            // return res.send({ status: 1, message: err.message })
            return res.cc(err)
        }

        //若重名 
        if (result.length > 0) {
            // return res.send({ status: 1, message: '用户名被占用，请更换其他用户名！' })
            return res.cc("用户名被占用，请更换其他用户名！")
        }

        //TODO 用户名可以使用
        // res.send('用户名可用 ')
        //对密码进行加密
        //hashSync方法
        //参数一是要加密的 数据
        //第二个参数 是安全长度 随便填一个数字即可 一般是10
        userinfo.password = bcryptjs.hashSync(userinfo.password, 10);

        //加密后向数据库添加用户数据
        const sqlstr2 = 'insert into ev_users set ?'
        db.query(sqlstr2, { username: userinfo.username, password: userinfo.password }, function (err, result) {
            //若错误
            if (err) {
                // return res.send({ status: 1, message: err.message })
                return res.cc(err)
            }
            //未添加到数据库
            if (result.affectedRows != 1) {
                // return res.send({ status: 1, message: "注册失败 请稍后再试" })
                return res.cc("注册失败 请稍后再试")
            }
            //成功
            // res.send("注册成功")
            res.cc("注册成功", 0)
        })

    })
}




//登陆处理函数**************************************************************************
//登陆处理函数**************************************************************************
exports.login = (req, res) => {
    //接受请求方数据
    const userinfo = req.body;
    //定义sql语句
    const sqlstr1 = 'select * from ev_users where username=?'
    //检查用户名时候否存在
    db.query(sqlstr1, userinfo.username, function (err, result) {
        //若错误
        if (err) res.cc(err)
        //判断 查询结果是否为1
        if (result.length !== 1) { return res.cc("用户名不存在") }
        //若用户名存在 查询密码是否正确
        //要使用 bcryptjs 的方法
        //参数1 是要比较的数据
        //参数2 是要解密的数据 
        //然后对两个数据对比
        const compareResult = bcryptjs.compareSync(userinfo.password, result[0].password)
        //若密码不正确
        if (!compareResult) { return res.cc("密码不正确！") }

        //向服务器发送token对象
        //确保安全性 提出数据库查询到的用户数据里的 密码和头像
        const user = { ...result[0], password: "", user_pic: "" }
        //调用包的方法  const jwt=require('jsonwebtoken'); 
        //与密匙const config=require('../config') 记得使用的是config.jwtSecretKey 里面的jwtSecretKey属性
        const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: "10h" })
        //向服务器发送 token字符串
        res.send({
            status: 0,
            message: '登陆成功！',
            // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
            token: 'Bearer ' + tokenStr
        })



    })






}

