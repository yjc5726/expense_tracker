const mongoose = require('mongoose')
const Record = require('../record') // 載入 record model
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/expense-tracker'
mongoose.connect(MONGODB_URI, { useNewUrlParser: true }) // 設定連線到 mongoDB
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  for (let i = 0; i < 3; i++) {
    Record.create({
      name: 'name-' + i,
      category: 'category',
      date: 'date',
      amount: 0
    })
  }
  console.log('done')
})