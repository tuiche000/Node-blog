const express=require('express');
const app=express();
const server = app.listen(8080);

app.use((req,res)=>{
    const d = Math.round( Date.now()/1000 );
    console.log(d);
    
    res.send('111');
    
});