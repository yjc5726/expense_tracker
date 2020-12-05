const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const { name, category, date, amount } = req.body // 從 req.body 拿出表單裡的 name, category, date, amount 資料
  return Record.create({ name, category, date, amount }) // 存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then((record) => res.render('edit', { record, array: ['home', 'transportation', 'entertainment', 'food', 'other'] }))
    .catch(error => console.log(error))
})

router.post('/:id/edit', (req, res) => {
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

router.post('/:id/delete', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
module.exports = router