const express=require('express');

module.exports=function(){
    let router=express.Router();
    
    router.get('/',(req,res)=>{
        res.render('index.html',{});
    });
    router.use('/blog', require('./blog')());
    router.use('/article', require('./article')());


    return router;
}