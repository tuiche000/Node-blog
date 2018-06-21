const express = require('express');
const mysql = require('mysql');
const common = require('../../libs/common');
const db = mysql.createPool({ host: 'localhost', user: 'root', password: '123456', database: 'blog' });
const pathLib = require('path');
const fs = require('fs');

module.exports = function () {
    const router = express.Router();

    router.get('/', (req, res) => {
        switch (req.query.act) {
            case 'del':
                db.query(`SELECT * FROM blog_article WHERE ID=${req.query.id}`, (err, data) => {
                    if (err) {
                        console.error(err);
                        res.redirect('/500.html');
                    } else if (data.length == 0) {
                        res.redirect('/404.html');
                    } else {
                        fs.unlink('static/upload/' + data[0].pic_src, (err) => {

                            db.query(`DELETE FROM blog_article WHERE ID=${req.query.id}`, (err, data) => {
                                if (err) {
                                    console.error(err);
                                    res.redirect('/500.html');
                                } else {
                                    res.redirect('/admin/blog');
                                }
                            });

                        });
                    }
                });
                break;
            default:
                db.query(`SELECT * FROM blog_article`, (err, blogs) => {
                    if (err) {
                        console.error(err);
                        res.redirect('/500.html');
                    } else {
                        let articleData=blogs[0];
                        articleData.sDate=common.time2date(articleData.post_time);
                        articleData.content=articleData.content.replace(/^/gm, '<p>').replace(/$/gm, '</p>');
                        res.render('admin/blog.ejs', { blogs });
                    }
                });
        }
    });

    
    router.post('/', (req, res) => {
        const title = req.body.addblog_title;
        const description = req.body.addblog_description;
        const cont = req.body.addblog_cont;
        //获取时间戳
        const post_time = Math.round(Date.now() / 1000);
        let ext;    //后缀.png
        let oldPath;    //路径+文件名static/upload/aaa
        let newPath;    //路径+文件名+后缀名static/upload/aaa.png
        let newFileName;    //文件名+后缀名aaa.png

        if (req.files[0]) {
            ext = pathLib.parse(req.files[0].originalname).ext;   //后缀.png
            oldPath = req.files[0].path;  //路径+文件名static/upload/aaa
            newPath = req.files[0].path + ext;    //路径+文件名+后缀名static/upload/aaa.png
            newFileName = req.files[0].filename + ext;    //文件名+后缀名aaa.png
        } else {
            newFileName = null;
        }

        //重命名图片
        fs.rename(oldPath, newPath, err => {
            if (err) {
                res.redirect('/500.html');
            }
        });

        //查询session用户名
        let author;
        let session_id = req.session['admin_id'];

        db.query(`SELECT * FROM blog_admin WHERE ID=${session_id}`, (err, data) => {
            if (err) {
                res.redirect('/500.html');
            } else if (data.length == 0) {
                res.redirect('/404.html');
            } else {
                author = data[0].username;

                //添加数据
                db.query(`INSERT INTO blog_article (title, pic_src, description, content, post_time, author) 
         VALUES('${title}', '${newFileName}', '${description}', '${cont}', '${post_time}', '${author}')`, (err, data) => {
                        if (err) {
                            console.error(err);
                            res.redirect('/500.html');
                        } else {
                            res.redirect('/admin/blog');
                        }
                    });

            }
        });


    });

    return router;
}