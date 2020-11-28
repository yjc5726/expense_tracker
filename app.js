// 載入 express 並建構應用程式伺服器
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const mongoose = require('mongoose') // 載入 mongoose
const exphbs = require('express-handlebars')
const Record = require('./models/record') // 載入 Record model
const Category = require('./models/category') // 載入 Category model

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

// 設定首頁路由
app.get('/', (req, res) => {
  Record.find() // 取出 Record model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .sort({ date: 'desc' })
    .then((records) => res.render('index', { records, array: ['home', 'transportation', 'entertainment', 'food', 'other'] }))
    .catch(error => console.error(error))
})

app.get('/records/new', (req, res) => {
  return res.render('new')
})

app.post('/records', (req, res) => {
  const { name, category, date, amount } = req.body // 從 req.body 拿出表單裡的 name, category, date, amount 資料
  return Record.create({ name, category, date, amount }) // 存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})

app.get('/records/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then((record) => res.render('edit', { record, array: ['home', 'transportation', 'entertainment', 'food', 'other'] }))
    .catch(error => console.log(error))
})

app.post('/records/:id/edit', (req, res) => {
  const id = req.params.id
  const { name, category, date, amount } = req.body
  return Record.findById(id)
    .then(record => {
      record.name = name
      record.category = category
      record.date = date
      record.amount = amount
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.post('/records/:id/delete', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.get('/search', (req, res) => {
  const keyword = req.query.category
  Record.find() // 取出 Record model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .find({ category: `${keyword}` })
    .then(records => res.render('index', { records, keyword, array: ['home', 'transportation', 'entertainment', 'food', 'other'] })) // 將資料傳給 index 樣板
    .catch(error => console.error(error)) // 錯誤處理
})
// 設定 port 3000
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})
