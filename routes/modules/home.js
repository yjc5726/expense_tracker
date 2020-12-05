// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 Todo model
const Record = require('../../models/record')
// 定義首頁路由
router.get('/', (req, res) => {
  Record.find() // 取出 Record model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .sort({ date: 'desc' })
    .then((records) => res.render('index', { records, array: ['home', 'transportation', 'entertainment', 'food', 'other'] }))
    .catch(error => console.error(error))
})
router.get('/search', (req, res) => {
  const keyword = req.query.category
  Record.find() // 取出 Record model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .find({ category: `${keyword}` })
    .then(records => res.render('index', { records, keyword, array: ['home', 'transportation', 'entertainment', 'food', 'other'] })) // 將資料傳給 index 樣板
    .catch(error => console.error(error)) // 錯誤處理
})
// 匯出路由模組
module.exports = router