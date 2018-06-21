const express = require('express');
const mysql = require('mysql');
const common = require('../../libs/common');
const db = mysql.createPool({ host: 'localhost', user: 'root', password: '123456', database: 'blog' });

module.exports=function(){
    const router = express.Router();

    //显示文章
    router.get('/',(req,res)=>{
        if(req.query.id){
            db.query(`SELECT * FROM blog_article WHERE ID=${req.query.id}`, (err,data)=>{
                if(err){
                    console.error(err);
                    res.redirect('/500.html');
                }else if(data.length==0){
                    res.redirect('/404.html');
                }else{
                    let articleData=data[0];
                    articleData.post_time=common.time2date(articleData.post_time);
                    articleData.content=articleData.content.replace(/^/gm, '<p>').replace(/$/gm, '</p>');
                    res.render('web/article.ejs',{ data });
                }
            });
        }else{
            res.redirect('/404.html');
        }
    });

    return router;
}