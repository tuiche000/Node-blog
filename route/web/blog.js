const express=require('express');
const mysql = require('mysql');
const common = require('../../libs/common');
const db = mysql.createPool({ host: 'localhost', user: 'root', password: '123456', database: 'blog' });

module.exports=function(){
    const router = express.Router();

    router.get('/', (req,res)=>{
        db.query(`SELECT * FROM blog_article`, (err,data)=>{
            if(err){
                console.error(err);
                res.redirect('/500.html');
            }else{
                let articleData=data;
                for(let v of articleData){
                    
                    v.post_time=common.time2date(v.post_time);
                }
                res.render('web/blog.ejs',{data});
            }
        });
    });

    return router;
}