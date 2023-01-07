//console.log("hello express.js")


//node.js express 固定開頭
'use strict';
const express = require("express")
const app = express()


//啟動服務
const PORT = process.env.PORT || 3000
app.listen(PORT ,(err)=>{
    if(err){
        console.error("出錯啦!!!")
    }
    console.log("正常服務中...","http://127.0.0.1:"+PORT)
})

//基礎使用
//默認根路徑
app.get("/",(req,res)=>{
    console.log("->", req.url)
    res.send("<h1>Helo</h1>")
})


//重定向路徑
app.get("/blog",(req,res)=>{
    res.redirect("/")
})