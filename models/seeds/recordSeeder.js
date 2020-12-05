const Record = require('../record') // 載入 record model
const db = require('../../config/mongoose')
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
