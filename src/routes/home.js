var express = require('express')
var router = express.Router()

const homeController = require('../app/controllers/HomeController')

router.use('/', homeController.index)

module.exports = router 