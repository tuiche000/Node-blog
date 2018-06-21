const express = require('express');
const mysql = require('mysql');
const common = require('../../libs/common');
const db = mysql.createPool({ host: 'localhost', user: 'root', password: '123456', database: 'blog' });

module.exports = function () {
    const router = express.Router();

    router.get('/', (req, res) => {
        res.render('admin/login.ejs', {});
    });
    router.post('/', (req, res) => {
        const username = req.body.username;
        const password = common.md5(req.body.password + common.MD5_SUFFIX);

        db.query(`SELECT * FROM blog_admin WHERE username='${username}'`, (err, data) => {
            if (err) {                
                res.redirect('/500.html');
            } else if (data.length == 0) {
                res.redirect('/404.html');
            } else if (password == data[0].password) {
                req.session['admin_id'] = data[0].ID;
                res.redirect('/admin/');
            }else{
                res.redirect('/404.html');
            }
        });
    });

    return router;
}