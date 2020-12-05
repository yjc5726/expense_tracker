// 載入 express 並建構應用程式伺服器
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const mongoose = require('mongoose') // 載入 mongoose
const exphbs = require('express-handlebars')
// 引用路由器
const routes = require('./routes')

// 引用 body-parser
const bodyParser = require('body-parser')

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/expense-tracker'
mongoose.connect(MONGODB_URI, { useNewUrlParser: true }) // 設定連線到 mongoDB

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))

// 將 request 導入路由器
app.use(routes)





// 設定 port 3000
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})
