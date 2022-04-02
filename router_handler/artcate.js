
//导报 导入数据库
const db = require('../db/index')

//路由函数  查询所有文章
exports.getCates = (req, res) => {
    //定义sql语句
    const sqlstr1 = 'select * from ev_article_cate where is_delete=0 order by id asc'
    //查询 
    db.query(sqlstr1, (err, results) => {
        //若失败
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取文章分类成功',
            data: results
        })
    })
}



exports.addCates = (req, res) => {
    //定义sql语句1
    const sqlstr1 = 'select * from ev_article_cate where name=? or alias=?'
    //查询 名称 与别名是否被占用
    db.query(sqlstr1, [req.body.name, req.body.alias], (err, results) => {
        //若失败
        if (err) return res.cc(err)
        //若重名 健壮性 三种情况
        if (results.length == 2) return res.cc('名字和别名重复，添加失败')
        if (results.length == 1 && results[0].name == req.body.name) return res.cc('名字重复，添加失败')
        if (results.length == 1 && results[0].alias == req.body.alias) return res.cc('别名重复，添加失败')

        //定义sql语句2
        const sqlstr2 = 'insert into ev_article_cate set ?'
        //查询数据库 添加文章分类
        db.query(sqlstr2, req.body, (err, results) => {
            //若失败
            if (err) return res.cc(err)
            //若添加数不为宜一
            if (results.affectedRows !== 1) return res.cc('添加失败')
            res.send({
                status: 0,
                message: '添加成功',
            })
        })
    })


}


exports.deleteCates = (req, res) => {
    //定义sql语句
    const sqlstr1 = 'update ev_article_cate set is_delete =1 where id=?'
    //查询
    db.query(sqlstr1, req.params.id, (err, results) => {
        //若错误
        if (err) return res.cc(err)
        //若修改结果不为1
        if (results.affectedRows !== 1) return res.cc('删除文章分类失败')
        res.cc("删除文章分类成功", 0)
    })
}

exports.getCates = (req, res) => {
    //定义sql语句
    const sqlstr1 = 'select * from ev_article_cate where id=?'
    //查询
    db.query(sqlstr1, req.params.id, (err, results) => {
        //若错误
        if (err) return res.cc(err)
        //若结果不为1
        if (results.length !== 1) return res.cc('获取文章分类失败')
        res.send({
            status: 0,
            message: '获取文章分类成功',
            data: results[0]
        })
    })
}

exports.updateCates = (req, res) => {
    //定义sql语句1
    const sqlstr1 = 'select * from ev_article_cate where id<>? and (name=? or alias=? )'
    //查询 名称 与别名是否被占用
    db.query(sqlstr1, [req.body.id ,req.body.name,req.body.alias], (err, results) => {
        //若失败
        if (err) return res.cc(err)
        //若重名 健壮性 三种情况
        if (results.length == 2) return res.cc('名字和别名重复，更新失败')
        if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.cc('分类名称与别名被占用，请更换后重试！')
        if (results.length == 1 && results[0].name == req.body.name) return res.cc('名字重复，更新失败')
        if (results.length == 1 && results[0].alias == req.body.alias) return res.cc('别名重复，更新败')

        //定义sql语句2
        const sqlstr2 = 'update ev_article_cate set ? where id=?'
        //更新数据库数据
        db.query(sqlstr2, [req.body, req.body.id], (err, results) => {
            //若失败
            if (err) return res.cc(err)
            //若结果不为1
            if (results.affectedRows !== 1) return res.cc('更新失败')
            //更新成功
            res.cc('更新成功', 0)
        })
    })

}