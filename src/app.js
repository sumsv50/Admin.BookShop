const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const Router = require('./routes/index');
const methodOverride = require('method-override')

const PORT = process.env.PORT || 5000

const app = express();

//Config and connect to MongoDB
const db = require('./config/db');
db.connect();

app.use(express.static(path.join(__dirname,'public')));

//Middleware parse req.body
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Method
app.use(methodOverride('_method'))

//Handlerbar
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');

app.set('views', path.join(__dirname, 'views'));




//[Router]
Router(app);

app.listen(PORT);
