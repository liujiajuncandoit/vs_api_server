//导入验证信息规则的包
const joi = require('@hapi/joi');


//账号验证规则
const username = joi.string().alphanum().min(6).max(12).required()

//密码验证规则
const password = joi.string().pattern(/^[\S]{6,12}$/).required()

//旧密码验证规则
const oldPwd = password

//新密码验证规则
//ps
// 1. joi.ref('oldPwd') 表示 newPwd 的值必须和 oldPwd 的值保持一致
// 2. joi.not(joi.ref('oldPwd')) 表示 newPwd 的值不能等于 oldPwd 的值
// 3. .concat() 用于合并 joi.not(joi.ref('oldPwd')) 和 password 这两条验证规则
const newPwd = joi.not(joi.ref('oldPwd')).concat(password)

//id
const id = joi.number().integer().min(1).required()

//nicjname 
const nickname = joi.string().required().min(6).max(16)

//email
const email = joi.string().email().required()

//user_pic
const avatar= joi.string().dataUri().required()

//导出验证规则  登陆
exports.reg_login_schema = {
    body: {
        username,
        password
    }
}

//导出验证规则  更新用户信息
exports.reg_update_schema = {
    body: {
        id,
        nickname,
        email,
    }
}

//导出验证规则 更新密码 
exports.reg_updatepassword_schema = {
    body: {
        oldPwd,
        newPwd
    }
}


//导出验证规则  头像
exports.reg_updatePic_schema = {
    body: {
        avatar
    }
}
