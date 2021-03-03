const newsRoute = require('./news')
const homeRoute = require('./home')
const courseRoute = require('./course')
const meRoute = require('./me')

function route(app) {

    app.use('/news',newsRoute);

    app.use('/course', courseRoute);

    app.use('/me', meRoute)

    app.use('/', homeRoute)

}

module.exports = route