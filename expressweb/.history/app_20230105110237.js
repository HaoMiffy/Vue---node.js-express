//Start
//mkdir(創建資料夾) XXXXX 
//cd(進入) XXXXX
//npm init -y 初始化專案的工程

//安裝express 和 開發調適包 nodemon
//npm install express --save
//npm install nodemon --save-dev
//nano(修改) package.json

// "scripts":{
//    "dev":"nodemon app.js"
// },

//新增檔案 app.js
//End

//node.js express 固定開頭
'use strict';
const express = require("express")
const app = express()


//啟動服務
const PORT = process.env.PORT || 3000
app.listen(PORT, (err) => {
    if (err) {
        console.error("出錯啦!!!")
    }
    console.log("正常服務中...", "http://127.0.0.1:" + PORT)
})

//基礎使用
//默認根路徑
app.get("/", (req, res) => {
    console.log("->", req.url)
    res.send("<h1>Helo</h1>")
})


//重定向路徑
app.get("/blog", (req, res) => {
    res.redirect("/")
})



//返回一個http代碼
app.get("/sitemap", (req, res) => {
    res.redirect(301, "/")
})

//返回404錯誤
app.get("/adult", (req, res) => {
    res.status(404).end()
})

//POST請求
//npm install body-parser --save
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())
app.post("/login", (req, res) => {
    console.log(req.body)
    res.json({
        post_result: 'ok',
        body: req.body,
    })
})

//POST測試
//curl -X POST -H "Content-Type: application/json" -d '{"uid":"koma","pwd":"12345678"}' http://localhost:3000/login

//顯示常用數據
const http = require('http')
app.get("/info", (req, res) => {
    res.json({
        //Http方法
        methods: http.METHODS,

        //Http狀態代碼
        status_ocdes: http.STATUS_CODES,

        //顯示請求頭
        Headers: req.headers,

        //顯示主機名
        hostname: req.hostname,

        //顯示請求URL
        url: req.url,

        //請求路徑
        path: req.path,

        //請求IP
        ip: req.ip,

        //請求方式
        method: req.method,

        //請求協議 : http, https
        protocol: req.protocol,

        //域名數組
        subdomains: req.subdomains,

        //請求串
        query: req.query,

        //請求參數
        params: req.params,

        //請求表單數據
        body: req.body
    })
})

//定義中間件(進階) ex.有點像是設置規定
const debug = (req, res, next) => {
    console.log("middleware.debug ->", req.method, req.url)
    next()
}

//應用中間件(debug)
app.use(debug)

//認證信息檢測中間件
const auth = (req, res, next) => {
    console.log("middleware.auth ->", req.method, req.url)
    if (req.query.uid == "koma")
        next()
    else
        res.status(403).end()
}
app.get("/admin", auth, (req, res) => {
    res.send("管理區")
})

//加入CORS 功能=> 跨域資源共享
//npm install cors --save
const cors = require("cors");
app.use(cors())  //全部API訪問許可, http://github.com/expressjs/cors

// 僅 http://api.komavideo.com 可用
//var corsOptions = {
//    origin: "http://api.komavideo.com",
//    optionsSuccessStatus: 200
//}
//app.use(cors(corsOptions))

app.get("/search", (req, res) => {
    res.send("search is good.")
})


const data = [{
    id:1,
    name: "Miffy01",
    age: "23"
},
{
    id:2,
    name: "Miffy02",
    age: "27"
},
{
    id:3,
    name: "Miffy03",
    age: "51"
},
{
    id:4,
    name: "Miffy04",
    age: "73"
},]
//返回json格式，API主用
app.get("/json", (req, res) => {
    
    res.json({
        result: 'ok',
        data
    });
    res.end();
})

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())
app.post("/json", (req, res) => {
    const product = req.body;
    data.push({
        ...product,
        id:new Date().getTime(),
    })
    console.log(data)
    res.send({
        success:true,
        data
    });
    res.end()
})

//:id動態的
app.delete("/json/:id", (req, res) => {
    const id = req.params.id
    console.log(id)

    data.forEach((item, key)=>{
        if(item.id == id){ //型別需要轉換
            data.splice(key,1)
        }
    })
    res.send({
        success:true,
        data
    });
    res.end()
})

app.patch("/json/:id", (req, res) => {
    const id = req.params.id;
    
})


//curl -I http://127.0.0.1:3000/search

//Bone
