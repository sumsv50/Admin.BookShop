// Define Routers
const dashboardRouter = require('./dashboardRouter');
const productsRouter = require('./productsRouter');
const siteRouter = require('./siteRouter');
const accountsRouter = require('./accountsRouter');

function route(app){
    app.use('/', siteRouter);
    app.use('/dashboard', dashboardRouter);
    app.use('/products', productsRouter);
    app.use('/accounts', accountsRouter);
}

module.exports = route;