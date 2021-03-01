const Course = require('../models/Courses')
const {multiMongooseToObject} = require('../../util/mongoose')

class SiteController {

    // [GET] /
    index (req, res, next) {

        Course.find({})
            .then(courses => {
                res.render('home', {
                    courses: multiMongooseToObject(courses)
                })
            })
            .catch(next)
    }
}

module.exports = new SiteController