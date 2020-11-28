const mongoose = require('mongoose')
const Schema = mongoose.Schema
const recordSchema = new Schema({
  name: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
  },
  category: {
    type: String, // 資料型別是字串紀錄id
    required: true // 這是個必填欄位
  },
  date: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
  },
  amount: {
    type: Number, // 資料型別是數字
    required: true // 這是個必填欄位
  }
})
module.exports = mongoose.model('Record', recordSchema)
