const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const items =  require('./routes/api/item');

const app = express();


app.use(bodyParser.json());

const dbConfig = require('./config/database.config.js');
mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url,{
     useNewUrlParser:true
}).then(() =>{
    console.log("Successfully connected to the database");
}).catch(err =>{
      console.log("Could not connect to the database . Exiting now",err);
});
// USe Routes
app.use('/api/items',items);
const port = process.env.PORT || 5000;

app.listen(port,()=> console.log(`Server started on prot ${port}`));