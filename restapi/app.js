const express = require('express');
const app = express();

const productionRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
app.use('/products',productionRoutes);
app.use('/orders',orderRoutes);

module.exports = app;