//导入验证信息规则的包
const joi = require('@hapi/joi');


//文章分类 名称
const name = joi.string().required()

//文章分类 别名
const alias = joi.string().alphanum().required()

//文章分类id

const id = joi.number().integer().min(1).required()




//导出验证规则  添加文章分类
exports.add_artical_schema = {
    body: {
        name,
        alias
    }
}



//导出验证规则  根据id删除指定文章分类
exports.delete_artical_schema = {
    params: {
        id
    }
}

//导出验证规则  根据id获取指定文章分类
exports.get_artical_schema = {
    params: {
        id
    }
}


//导出验证规则  根据id 以及数据 更新文章分类
exports.update_artical_schema = {
    body: {
        id,
        name,
        alias
    }
}
