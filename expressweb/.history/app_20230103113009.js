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
