var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var serveStatic = require('serve-static')
const open = require('open');
//var mysql = require('mysql');
const { isNullOrUndefined } = require('util');
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

//using serveStatic
app.use(serveStatic('public'));

let notes = [];

// viewed at http://localhost:3000
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname + '/notes.html'));
});

app.get('/api/notes', function(req, res) {
    //res.send('test77')
    res.json({ notes });
    //console.log(notes);
});

app.post('/api/notes', function(req, res) {
    const noteText = req.body.noteText;
    const noteTitle = req.body.noteTitle;
    console.log(req.body)
    const noteId = Math.floor(Math.random() * 1000);
    class Note {
        constructor(noteText, noteTitle, noteId) {
            this.noteText = noteText;
            this.noteTitle = noteTitle;
            this.noteId = noteId;
        }
    }
    let newNote = new Note(noteText, noteTitle, noteId);
    notes.push(newNote);
    //console.log('notes:',notes);
    //console.log('newNote:',newNote);
    res.send(newNote);
    //console.log('noteId:',noteId);
    //res.send('api notes posted here');
    fs.writeFile('db.json',

        JSON.stringify(notes)


        ,
        function(err) {
            if (err) throw err;
            //console.log('Saved!');
        });


});

app.post('/form', (req, res) => {
    const name = req.body.name
})

app.delete('/api/notes', function(req, res) {
    const noteId = Number(req.body.noteId);
    console.log('deleting', { noteId })
    notes = notes.filter(n => n.noteId !== noteId)
    fs.writeFile('db.json',
        JSON.stringify(notes),
        function(err) {
            if (err) throw err;
            res.send({ success: true, noteId })
        });
});