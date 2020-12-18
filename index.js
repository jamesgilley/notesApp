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