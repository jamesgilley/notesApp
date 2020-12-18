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

/* var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mydb"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted, ID: " + result.insertId);
    });
    con.query("SELECT * FROM customers", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
      });
  }); */

  let notes=[];

// viewed at http://localhost:3000
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname + '/notes.html'));
});

app.get('/api/notes', function(req, res) {
    //res.send('test77')
    res.json({notes});
    //console.log(notes);
});

app.post('/api/notes', function(req, res) {
    const noteText = req.body.noteText;
    const noteTitle = req.body.noteTitle;
    console.log(req.body)
    const noteId = Math.floor(Math.random() * 1000); 
    class Note{
        constructor(noteText, noteTitle, noteId){
        this.noteText=noteText;
        this.noteTitle=noteTitle;
        this.noteId=noteId;
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
   
    
    , function (err) {
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
    JSON.stringify(notes)
    , function (err) {
        if (err) throw err;
        res.send({ success: true, noteId })
      });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server started on ${port}`));

if (port===3000){

(async () => {
    // Opens the URL in a specified browser.
    await open('http://localhost:3000/notes', {app: 'chrome'});
 
})();
}