const path = require('path')
const express = require('express')
const morgan = require('morgan')
const handlebars  = require('express-handlebars');
const app = express()
const port = 2345
const Route = require('./routes/index')
const db = require('./config/db')
const methodOverride = require('method-override')
const SortMiddleware = require('./app/middlewares/SortMiddleware')

//connect DB 
db.connect();

app.use(express.static(path.join(__dirname,'public')))

app.use(express.urlencoded({
  extended: true,
}));
app.use(express.json());

// override with the X-HTTP-Method-Override header in the request
app.use(methodOverride('_method'))

//custom Middleware
app.use(SortMiddleware)

//HTTP Logger
// app.use(morgan('combined'))

//handlebars engine
app.engine('hbs', handlebars({
  extname: ".hbs",
  helpers: {
    sum: (a,b) => a + b,
    sortable: (field, sort) => {

      const sortType = field === sort.column ? sort.type : 'default';

      const icons = {
        default: 'oi oi-elevator',
        asc: 'oi oi-sort-ascending',
        desc: 'oi oi-sort-descending'
      }

      const types = {
        default: 'desc',
        asc: 'desc',
        desc: 'asc'
      }

      const icon = icons[sortType]
      const type = types[sortType]

      return `<a href="?_sort&column=${field}&type=${type}">
                <span class="${icon}"></span>
              </a>`

    }
  }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

Route(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})