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