const Course = require('../models/Courses')
const { multiMongooseToObject } = require('../../util/mongoose')
class HomeController {

    // [GET] /
    index(req,res,next) {
        res.render('home')
    }
}

module.exports = new HomeController