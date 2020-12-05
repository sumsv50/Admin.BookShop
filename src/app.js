const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override')
require('dotenv').config();
var moment = require('moment'); // Generate Date


const Router = require('./routes/index');

const PORT = process.env.PORT || 3000;

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
app.engine('.hbs', exphbs({
    extname: '.hbs',
    helpers: {
        select: function (value, label, selectedValue){
            var selectedProperty = value == selectedValue ? 'selected="selected"' : '';
            return new Handlebars.SafeString('<option value="' + value + '"' +  selectedProperty + '>' + label + "</option>");
        },
        ifEquals: function (arg1, arg2, options) {
            return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
        },
        generateDate: function (date, format) {
            return moment(date).format(format);
        }
    }
})
);
app.set('view engine', '.hbs');

app.set('views', path.join(__dirname, 'views'));




//[Router]
Router(app);

app.listen(PORT);
