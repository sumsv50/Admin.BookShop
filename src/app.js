const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const Router = require('./routes/index');

const app = express();

//Config and connect to MongoDB
const db = require('./config/db');
db.connect();

app.use(express.static(path.join(__dirname,'public')));

//Middleware parse req.body
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Handlerbar
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');

app.set('views', path.join(__dirname, 'views'));




//[Router]
Router(app);

app.listen(3000);
