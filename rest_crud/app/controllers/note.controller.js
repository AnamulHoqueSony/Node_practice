const Note = require('../models/note.model.js');

// Create and Save a new Note
exports.create = (req, res) => {
    if(!req.body.content){
        return res.status(400).send({
            mesage:"Note content can not empty"
        });
    }
    const note = new Note({
        title:req.body.title || "Untitled Note",
        content:req.body.content
    });
    note.save()
    .then(data =>{
        res.send(data);
    })
    .catch(err =>{
         res.status(500).send({
             message:err.mesage || "Some error ocurred while creating the Note"
         });
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Note.find()
    .then(notes =>{
        res.send(notes);
    }).catch(err =>{
        res.status(500).send({
          message:err.message || "Some error occoured while retriving notes."
        });
    });

};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    Note.findById(req.params.noteId)
    .then(note =>{
       if(!note){
           return res.status(404).send({
               meassage: "Note not found whit id "+ req.params.noteId
           });
       }
       res.send(note);
    }).catch( err =>{
       if(err.kind === 'ObjectId'){
           return res.status(404).send({
             meassage : "Note not found with id"+req.params.noteId
           });
       
        }
        return res.status(500).send({
            meassage: " Error retrieving note with id"+ req.params.noteId
        });
    });
    
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {

};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {

};