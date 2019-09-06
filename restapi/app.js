const express = require('express');
const mongoose = require('mongoose');
const app = express();

const bodyParser = require('body-parser');

const morgan = require('morgan');

const productionRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

mongoose.connect('mongodb://nayeem-roni2:nayeem-roni2@ds121321.mlab.com:21321/addess-book', {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use((req,res,next) =>{
    res.header('Access-Control-Allow-Origin',"*");
    res.header(
        "Access-control-Aloow-Headers",
        "Oigin,X-Requested-With,Content-Type,Accept,Authorization"
    );
    if(req.method === 'OPTIONS'){
        req.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
});

app.use('/products',productionRoutes);
app.use('/orders',orderRoutes);

app.use((req,res,next) =>{
       const error  = new Error('Not found');
       error.status(404);
       next(error);
});
app.use((error,req,res,next) =>{
    res.status(error.status || 500);
    res.json({
       error:{
           message:error.message
       }
    });
});

module.exports = app;