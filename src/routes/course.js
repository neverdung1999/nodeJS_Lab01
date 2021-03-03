var express = require('express')
var router = express.Router()

const courseController = require('../app/controllers/CoursesController')

router.post('/store', courseController.store)
router.get('/create', courseController.create)
router.get('/:id/edit', courseController.edit)
router.put('/:id/update', courseController.update)
router.patch('/:id/restore', courseController.restore)
router.delete('/:id', courseController.delete)
router.delete('/:id/force', courseController.forceDelete)
router.get('/:slug', courseController.showDetail)
router.get('/', courseController.index)

module.exports = router 