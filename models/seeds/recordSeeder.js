const mongoose = require('mongoose')
const Record = require('../record') // 載入 record model
mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })
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