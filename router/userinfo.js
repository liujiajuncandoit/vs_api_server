const express=require('express')

//导入路由函数
const userInfoHandler=require('../router_handler/userinfo')

//导入包 数据验证规则第三方包
const expressjoi=require('@escook/express-joi')

//导入包 数据验证规则自定义包 需要 导入 其包中的 更新密码 更新用户信息 头像 三个验证规则
const {reg_updatepassword_schema,reg_update_schema,reg_updatePic_schema }=require('../schema/user')

//创建路由对象
const router=express.Router()

//注册获取信息 路由
router.get('/userinfo',userInfoHandler.getUserInfo)

//注册更新用户信息 路由  并且要注册一个全局中间件 即验证规则
router.post('/userinfo',expressjoi(reg_update_schema),userInfoHandler.updateUserInfo)

//注册修改用户密码 路由 并且要注册一个全局中间件 即验证规则
router.post('/updatewd',expressjoi(reg_updatepassword_schema),userInfoHandler.updatePassword)

//注册修改用户头像 路由 并且要注册一个全局中间件 即验证规则
router.post('/updat/avatar',expressjoi(reg_updatePic_schema),userInfoHandler.updateAvatar)

module.exports=router;