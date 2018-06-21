const express=require('express');
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const cookieSession=require('cookie-session');
const multer=require('multer');
const multerObj=multer({dest:'./static/upload'});
const static=require('express-static');
const consolidate=require('consolidate');
const expressRoute=require('express-route');

const server=express();

server.listen(80);

//1.获取请求数据
//get自带
server.use(bodyParser.urlencoded());    //post获取数据
server.use(multerObj.any());    //post获取文件

//2.cookie、session
server.use(cookieParser({
    maxAge:20*60*1000   //20min
}));
{
let keys=[];
for(let i=0;i<10000;i++){
    keys[i]='a'+Math.random();
}
server.use(cookieSession({
    name:'sess_id',
    keys:keys,
    maxAge:30*60*60*1000   //30天
}));
}

//3.模板
server.engine('html',consolidate.ejs);
server.set('views','template');
server.set('view engine','html');

//4.route
server.use('/',require('./route/web/index')())
server.use('/admin/',require('./route/admin/index')())

//5.default：static
server.use(express.static(__dirname + '/static'));