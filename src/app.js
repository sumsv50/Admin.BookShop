const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

//Handlerbar
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname,'public')));

app.get('/', function(req, res){
    res.render('home');
})

app.listen(3000);
