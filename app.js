global.__base = __dirname + "/";
var express = require('express');
var path = require('path');
var fs = require('fs');
var uuid = require('node-uuid');
var bodyParser = require('body-parser');
var session = require('express-session');
var rfs = require('rotating-file-stream');
var assetsConfig = require(__base+'public/manifest.json');
var chunkManifest = require(__base+'public/chunk-manifest.json');
var router = express.Router();

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router.get('/', function(req, res, next) {
    var locals = {
        assetsConfig,
        chunkManifest,
        solution: ""
    };
	res.render('index', locals);
}))

module.exports = app;
