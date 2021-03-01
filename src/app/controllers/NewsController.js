
class NewsController {

    // [GET] /news
    index (req, res) {
        res.render('news')
    }

    //[GET] /news/:slug
    //:slug là 1 path bất kỳ nào cũng được, ví dụ /news/abc = /news/bcd
    show(req,res) {
        res.send('hello world')
    }
}

module.exports = new NewsController