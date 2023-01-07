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

//返回json格式，API主用
app.get("/json",(req,res)=>{
    res.json({
        result:'ok'
    })
})

//返回一個http代碼
app.get("/sitemap",(req,res)=>{
    res.redirect(301,"/")
})

//返回404錯誤
app.get("/adult",(req,res)=>{
    res.status(404).end()
})

//POST請求
//npm install body-parser --save
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(bodyParser.json())
app.post("/login",(req,res)=>{
    console.log(req.body)
    res.json({
        post_result:'ok',
        body: req.body,
    })
})

//POST測試
//curl -X POST -H "Content_Type: application/json" -d '{"uid":"koma","pwd":"12345678"}' http://localhost:3000/login

//顯示常用數據
const http = require('http')
app.get("/info",(req,res)=>{
    res.json({
        //Http方法
        methods: http.METHODS,


    })
}) 