const express = require('express');
const categoryRoutes = require('./modules/categories/category.routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(express.json());

app.use('/api/categories', categoryRoutes);

app.use(errorHandler);

module.exports = app;
