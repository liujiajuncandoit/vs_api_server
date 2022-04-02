//导包 创建路由
const express=require('express');
const router=express.Router();

//导包 导入 路由函数
const router_handler=require('../router_handler/artcate')

//导报 导入验证规则第三方包
const expressjoi=require('@escook/express-joi')
//导包 导入 数据证规则 自定义包
const {get_artical_schema,delete_artical_schema,add_artical_schema,update_artical_schema}=require('../schema/artcate')

//创建路由 查询所有文章 
router.get('/cates',router_handler.getCates)

//创建路由 新增文章 注册局部中间件*验证规则
router.post('/addcates',expressjoi(add_artical_schema),router_handler.addCates)

//创建路由 根据id 删除文章 注册局部中间件*验证规则
router.get('/deletecates/:id',expressjoi(delete_artical_schema),router_handler.deleteCates)

//创建路由  根据id 获取文章  注册局部中间件*验证规则
router.get('/cates/:id',expressjoi(get_artical_schema),router_handler.getCates)

//创建路由  根据id 获取文章  注册局部中间件*验证规则
router.post('/updatecates',expressjoi(update_artical_schema),router_handler.updateCates)



module.exports=router