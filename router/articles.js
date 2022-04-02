//导入包 创建路由
const express=require('express');
const router=express.Router();

//导入包 引入路由处理函数
const router_handler=require('../router_handler/article')

//添加路由 添加文章路由
router.post("/add",router_handler.addArticel)


//共享路由
module.exports=router