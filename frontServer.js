/**
 * Created by lejonmcgowan on 9/20/16.
 */

'use strict';

var express = require('express');
var path = require('path');

var app = express();

app.use('/assets',express.static(__dirname + '/src/assets'));
app.use('/css',express.static(__dirname + '/src/css'));
app.use('/js',express.static(__dirname + '/src/js'));
app.use('/stuff',express.static(__dirname + '/src/data'));
app.use('/bootstrap',express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/jquery',express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/tether',express.static(__dirname + '/node_modules/tether/dist'));

var projetcs = require('./src/js/projectHeaders.json');


app.set('view engine', 'pug');
app.set('views', __dirname + '/src/templates/');

app.listen(3000, function()
{
   console.log("We did it on 3000");
});

app.get('/', function(request, response)
{
   response.render('index',{"projects": projetcs});
});

app.get('/about', function(request, response)
{
    response.render('about');
});

app.get('/contact', function(request, response)
{
    response.render('contact');
});