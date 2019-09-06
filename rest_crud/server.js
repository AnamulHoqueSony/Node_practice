const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url,{
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err =>{
   console.log("Could not connect to the database . Exiting now ......",err);
   process.ext();
});

const app = express();

app.use(bodyParser.urlencoded({extend:true}));
app.use(bodyParser.json());


app.get('/',(req,res) =>{
    res.json({
        "message":"Wellcome to EasyNotes application."
    });
});

equire('./app/routes/note.routes.js')(app);

app.listen(3000,() =>{
   console.log("Server is listening on prot 3000");
});