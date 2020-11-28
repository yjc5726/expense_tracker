const mongoose = require('mongoose')
const Category = require('../category')
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/expense-tracker'
mongoose.connect(MONGODB_URI, { useNewUrlParser: true }) // 設定連線到 mongoDB
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  Category.create({
    name: 'home',
    ch_name: '家居物業',
    icon: 'https://fontawesome.com/icons/home?style=solid'
  }, {
    name: 'transportation',
    ch_name: '交通出行',
    icon: 'https://fontawesome.com/icons/shuttle-van?style=solid'
  }, {
    name: 'entertainment',
    ch_name: '休閒娛樂',
    icon: 'https://fontawesome.com/icons/grin-beam?style=solid'
  }, {
    name: 'food',
    ch_name: '餐飲食品',
    icon: 'https://fontawesome.com/icons/utensils?style=solid'
  }, {
    name: 'other',
    ch_name: '其他',
    icon: 'https://fontawesome.com/icons/pen?style=solid'
  })

  console.log('done')
})
