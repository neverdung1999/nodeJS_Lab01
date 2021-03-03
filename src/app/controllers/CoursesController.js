const Course = require('../models/Courses')
const { multiMongooseToObject, mongooseToObject } = require('../../util/mongoose')

class CourseController {

    // [GET] /
    index(req,res,next) {
        Course.find({})
            .then(courses => {
                res.render('./courses/course', { 
                    courses: multiMongooseToObject(courses)
                })
            })
            .catch(next)
    }

    showDetail(req,res,next) {
        Course.findOne({ slug: req.params.slug })
            .then(courses => {
                res.render('./courses/courseDetails', { 
                    courses: mongooseToObject(courses)
                })
            })
            .catch(next)
    }

    // [GET] /course/create
    create(req,res,next) {
        res.render('./courses/createCourses')
    }

    // [POST] /course/store
    store(req,res,next) {
        const formBody = req.body
        formBody.img = `https://img.youtube.com/vi/${formBody.videoId}/maxresdefault.jpg`
        const course = new Course(formBody)
        course.save()
            .then(() => res.redirect('/course'))
            .catch(error => { 
                console.log('404 not found')
            })
    }       

    //[GET] /course/:id
    edit(req,res,next) {
        Course.findById(req.params.id)
            .then(courses => {res.render('courses/editCourses', {
                courses: mongooseToObject(courses)
            })})
    }
    
    //[PUT] /course/:id
    update(req,res,next) {
        Course.updateOne({ _id: req.params.id }, req.body )
            .then(()=> res.redirect('/me/stored/course'))
            .catch(next)
    }

    //[DELETE] /course/:id
    delete(req,res,next) {
        Course.delete({ _id: req.params.id })
            .then(() => {res.redirect('back')})
            .catch(next)
    }

    //[DELETE] /course/:id/force
    forceDelete (req,res,next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => {res.redirect('back')})
            .catch(next)
    }

    //[PATCH] /course/:id/restore
    restore(req,res,next) {
        Course.restore({ _id: req.params.id })
            .then(() => {res.redirect('back')})
            .catch(next)
    }

    //[POST] /course/handle-form-action
    handleFormAction(req,res,next) {
        res.json(req.body)
    }
    
}

module.exports = new CourseController