// Define Routers
const dashboardRouter = require('./dashboardRouter');
const productsRouter = require('./productsRouter');

function route(app){
    app.use('/dashboard', dashboardRouter);
    app.use('/products', productsRouter);
}

module.exports = route;