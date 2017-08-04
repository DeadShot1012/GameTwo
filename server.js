var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var router = require('./router');
var path = require('path');

mongoose.connect('mongodb://localhost/mandp');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname,'public')));

 app.use('/',router);
//app.set('view engine', 'html');
app.set('view engine', 'ejs');
app.set('views','public');
 app.listen(8086,function(){
 	console.log("Server Started opn port 8086");
 });
