const express = require('express');
const app = express();

const errorMiddlewate = require('./middlewares/error')

app.use(express.json());
// Import all route

const products = require('./routes/product');


app.use('/api/v1', products)

// Middleware to handle errors
app.use(errorMiddlewate)

module.exports = app