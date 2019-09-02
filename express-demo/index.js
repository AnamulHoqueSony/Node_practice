const config  = require('config');
const morgan = require('morgan');
const  express = require('express');
const helmet = require('helmet');
const logger = require('./logger');
const joi = require('joi');
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(logger);
app.use(helmet());
app.use(morgan('tiny'));

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app:${app.get('env')}`);
const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'},
    {id: 4, name: 'course4'},

];

console.log('Application Name : '+ config.get('name'));
console.log('Mail server ' + config.get('name'));

app.get('/',(req,res) =>{
    res.send("Hello world");
});
app.get('/api/courses',(req,res) =>{
    res.send(courses);
});
app.use(express.static('public'));
app.post('/api/courses',(req,res) =>{
    if(!req.body.name || req.body.name.length < 3){
        res.status(400).send("XXXXXXXXX");
    }
    const course = {
        id: courses.length +1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
    return ;
});

app.put ('/api/courses/:id',(req,res) =>{
    const course = courses.find( c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('The course is not found');
    if(!req.body.name || req.body.name.length < 3){
        res.status(400).send("XXXXXXXXX");
    }
    course.name = req.body.name;
    res.send(course);
});

app.get('/api/courses/:id',(req,res) =>{
    const course = courses.find( c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('The course is not found');
    res.send(course);
});

app.delete('/api/courses/:id',(req,res) =>{
    const course = courses.find( c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('The course is not found');

    const index = courses.indexOf(course);
    courses.splice(index,1);

    res.send(course);

});
app.listen(3000, () => console.log("Listening on prot 3000 ..."));