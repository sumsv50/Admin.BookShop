// Define Routers
const dashboardRouter = require('./dashboardRouter');
const productsRouter = require('./productsRouter');
const siteRouter = require('./siteRouter');

function route(app){
    app.use('/dashboard', dashboardRouter);
    app.use('/products', productsRouter);
    app.use('/', siteRouter);
}

module.exports = route;