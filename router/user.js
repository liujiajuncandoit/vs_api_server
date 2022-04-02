//导入包express
const express = require('express');
//导入包router_handler/user 处理路由函数
const userHandler = require('../router_handler/user')
//导入包 数据验证规则第三方包
const expressJoi=require('@escook/express-joi');
//导入包 数据验证规则自定义包
//{reg_login_schema}的意思是 只接受 该包下exports 对象的reg_login_schema属性
const {reg_login_schema}=require('../schema/user');


//创建路由对象
const router = express.Router();


//为注册路由写一个局部中间件
//作用是  优化表单数据验证
//ps 上方导入包  const expressJoi=require('@escook/express-joi'); 所得到的对象 expressJoi 就是一个中间件直接使用即可

//注册路由 并且使用局部中间件校验 用户名和密码是否符合规则
router.post('/reguser', expressJoi(reg_login_schema),userHandler.regUser)

//登陆路由 并且使用局部中间件校验 用户名和密码是否符合规则
router.post('/login', expressJoi(reg_login_schema),userHandler.login)


//共享路由
module.exports = router;


