const Course = require('../models/Courses')
const { multiMongooseToObject } = require('../../util/mongoose')

class meController {

    // [GET] /me/stored/course
    storedCourse(req,res,next) {

        let courseQuery = Course.find({})

        if(req.query.hasOwnProperty("_sort")){
            courseQuery = courseQuery.sort({
                [req.query.column]: req.query.type
            })
        }

        Promise.all([courseQuery, Course.countDocumentsDeleted()])
            .then(([courses, deleteCount]) => {
                res.render('me/stored_course', {
                    courses: multiMongooseToObject(courses),
                    deleteCount
                })
            })
            .catch(next)

        // Course.find({})
        //     .then(courses => {
        //         res.render('me/stored_course', {
        //             courses: multiMongooseToObject(courses)
        //         })
        //     })

    }

     // [GET] /me/trash/course
    trashCourse(req,res,next) {
        Course.findDeleted({})
            .then(courses => res.render('me/trash-course', {
                courses: multiMongooseToObject(courses)
            }))
            .catch(next)
    }
}

module.exports = new meController