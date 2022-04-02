//创建服务器
const express = require('express');
const app = express();

//导入包 用于错误级别中间件里处理 用户验证问题
const joi = require('@hapi/joi')


//导入自定义包 作用是 获取密匙 解析token字符串
const config = require('./config')

//解决跨域
const cors = require('cors');
app.use(cors());

//内置中间件 解决body表单数据
app.use(express.urlencoded({ extended: false }))
//第三方中间件 解决 multipart/form-data 格式的表单数据
const multer=require('multer');



//导入包 用于解析token字符串
const expressjwt = require('express-jwt');
//注册全局中间件 用于解析token字符串
//也就是 注册了这个中间件 的所有路由 在使用时都要先进行身份认证 否则 无法正常访问
app.use(expressjwt({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }))


//封装方法 以便可以在路由函数里调用 名字为res.cc 也就是 给res服务器对象 添加了一个属性=方法
//作用是 路由函数 出错的一个函数 可以直接调用res.cc() 
app.use(function (req, res, next) {
    //参数一是 错误对象
    //参数二是 状态码 默认不传是1， 1代表告诉用户错误了
    res.cc = function (err, status = 1) {
        res.send({
            status: status,
            //Error 是一个类 instansof 判断 err是否和Error是相同类型的数据
            //若是同一种类型 则说明 传进来的err对象 是一个错误对象 可以调用其属性message查看具体错误 
            //如不是 则说明 传进来 的是用户自定义的一个字符串 则直接使用字符串即可
            message: err instanceof Error ? err.message : err
        })
    }
    next()
})


//导入登陆注册路由模块
const userRouter = require("./router/user")
//为路由模块注册全局中间件
app.use('/api', userRouter)

//导入用户信息路由模块
const userinfoRouter= require('./router/userinfo')
//为路由模块注册全局中间件
app.use('/my',userinfoRouter)


//导入文章分类路由模块
const artcateRouter=require('./router/artcate')
//为路由模块注册全局中间件
app.use('/my/article',artcateRouter)



//导入文章路由模块
const articleRouter=require('./router/articles')
//为路由模块注册全局中间件
app.use('/my/article',articleRouter)


//注册错误级别中间件  一定要写在所有路由后面 
app.use(function (err, req, res, next) {
    //判断错误是否 属于 账号密码验证问题
    if (err instanceof joi.ValidationError) return res.send({status:1,message:"用户信息格式有误"})
    //判断错误是否属于身份验证的问题
    if (err.name === 'UnauthorizedError') return res.send({status:1,message:"身份验证错误"})
    //未知错误
    res.send({status:1,message:err.message})
})



app.listen(3007, function () {
    console.log('api server running at http://127.0.0.1:3007');
})

