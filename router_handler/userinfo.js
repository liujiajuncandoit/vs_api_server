//导包 导入数据库包
const db = require('../db/index')
//导报 对密码加密的包
const bcryptjs = require('bcryptjs')


//查询用户信息 的路由函数
exports.getUserInfo = (req, res) => {
    //定义sql语句
    const sqlstr1 = 'select id ,username ,nickname ,email,user_pic from ev_users where id=?'
    //查询数据库
    db.query(sqlstr1, req.user.id, function (err, results) {
        //若错误
        if (err) return res.cc(err)
        //若查询结果不为1 
        if (results.length !== 1) return res.cc('查询失败')

        //成功 则返回数据
        res.send({
            status: 0,
            messagr: '获取用户基本信息成功',
            data: results[0]
        })
    })
}


//更新用户信息 的路由函数
exports.updateUserInfo = (req, res) => {
    //定义sql语句
    const sqlstr1 = 'update ev_users set ? where id=?'
    //查询数据库
    db.query(sqlstr1, [req.body, req.body.id], (err, results) => {
        //若错误
        if (err) return res.cc(err)
        //若更新结果不为1
        if (results.affectedRows !== 1) return res.cc("更新用户数据失败")
        //成功
        res.cc('更新用户信息成功')
    })
}



//更新用户密码 的路由函数
exports.updatePassword = (req, res) => {
    //定义sql语句
    const sqlstr1 = 'select * from ev_users where id=?'
    //查询数据库 使用id获取用户是否存在
    db.query(sqlstr1, req.user.id, (err, results) => {
        //若错误
        if (err) return res.cc(err)
        //若更新结果不为1
        if (results.length !== 1) return res.cc("用户不存在！")
        //用户存在 则判断密码是否正确
        const compareresult = bcryptjs.compareSync(req.body.oldPwd, results[0].password)
        if (!compareresult) return res.cc('原密码不正确！')

        //正确则 将新密码加密后更新
        const newPwd = bcryptjs.hashSync(req.body.newPwd, 10)
        //定义sql语句
        const sqlstr2 = 'update ev_users set password=? where id=?'
        //查询数据库 更新密码
        db.query(sqlstr2, [newPwd, req.user.id], (err, results) => {
            //若错误
            if (err) return res.cc(err)
            //若修改值不为一
            if (results.affectedRows !== 1) return res.cc('修改密码失败')

            //修改成功
            res.cc('修改密码成功', 0)
        })

    })
}




//更新用户头像 的路由函数
exports.updateAvatar = (req, res) => {
    //定义sql语句 
    const sqlstr1 = 'update ev_users set user_pic=? where id=?'
    //查询数据库 
    db.query(sqlstr1, [req.body.avater, req.user.id], (err, results) => {
        //若错误
        if (err) return res.cc(err)
        //若更新结果不为1
        if (results.affectedRows !== 1) return res.cc("更新头像失败")
        //更新成功
        res.cc('更新头像成功',0)
    })
}