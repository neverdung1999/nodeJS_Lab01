const path = require('path')
const express = require('express')
const morgan = require('morgan')
const handlebars  = require('express-handlebars');
const app = express()
const port = 1234
const Route = require('./routes/index')
const db = require('./config/db')
const methodOverride = require('method-override')

//connect DB 
db.connect();

app.use(express.static(path.join(__dirname,'public')))

app.use(express.urlencoded({
  extended: true,
}));
app.use(express.json());

// override with the X-HTTP-Method-Override header in the request
app.use(methodOverride('_method'))

//HTTP Logger
// app.use(morgan('combined'))

//handlebars engine
app.engine('hbs', handlebars({
  extname: ".hbs",
  helpers: {
    sum: (a,b) => a + b,
  }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

Route(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})