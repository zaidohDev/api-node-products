const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const app = express();

// connect routes
// const indexRoutes = require('./routes/index')
const productRoutes = require('./routes/product');

//connection database
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', true);

mongoose.connect('mongodb://localhost:27017/nodeapi');
  console.log('connected from databse');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// app.use('/', indexRoutes);
app.use('/products', productRoutes);

module.exports = app;