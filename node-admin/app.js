const express = require('express')
const bodyParser = require('body-parser')
const router = require('./router')
const cors = require('cors')

// 创建了app应用
const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true })) //解析url后边带参数
app.use(bodyParser.json()) // 解析json格式
app.use('/', router)

// 使express监听5000端口发出的请求
const server = app.listen(5000, function() {
    const { port } = server.address()
    console.log('Http server is running on http://localhost:%s', port)
})