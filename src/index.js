const path = require('path')
const express = require('express')
const morgan = require('morgan')
const handlebars  = require('express-handlebars');
const app = express()
const port = 9999
const Route = require('./routes/index')
const db = require('./config/db')

//connect DB 
db.connect();

app.use(express.static(path.join(__dirname,'public')))

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

//HTTP Logger
// app.use(morgan('combined'))

//handlebars engine
app.engine('hbs', handlebars({
  extname: ".hbs"
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

Route(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})