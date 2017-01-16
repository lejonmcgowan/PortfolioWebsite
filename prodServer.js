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

var projectCardHeaders = require('./src/data/cardHeaders.json');
var jumboInfos = require('./src/data/projectHeaders.json');

app.set('view engine', 'pug');
app.set('views', __dirname + '/src/templates/');

var server = app.listen(8080, function()
{
   console.log("running on port 8080");
});

var io = require('socket.io').listen(server);

/*
 *now to setup the webpages
 *
 */

io.sockets.on('connection', function (socket) {
    console.log('A new user connected!');
    socket.emit('info', { msg: 'The world is round, there is no up or down.' });
});

app.get('/', function(request, response)
{
   response.render('index',{"cardHeaders": projectCardHeaders});
});

app.get('projects', function(request, response)
{
   response.render('projects',{"cardHeaders": projectCardHeaders});
});


app.get('/resume', function(request, response)
{
    response.render('resume');
});

app.get('/contact', function(request, response)
{
    response.render('contact');
});

//project pages

app.get('/LTree', function(request, response)
{
	response.render("projectPages/lTree",{"project": jumboInfos['ltree'], "techLinks": jumboInfos['techLinks'], "playLink": jumboInfos["playLinks"]});
});

app.get('/balrog', function(request, response)
{
	response.render("projectPages/balrog",{"project": jumboInfos['balrog'], "techLinks": jumboInfos['techLinks'], 
    "playLink": jumboInfos["playLinks"]});
});

app.get('/sphdemo', function(request, response)
{
	response.render("projectPages/sph",{"project": jumboInfos['sph'], "techLinks": jumboInfos['techLinks'], 
    "playLink": jumboInfos["playLinks"]});
});

app.get('/stickit', function(request, response)
{
	response.render("projectPages/lTree",{"project": jumboInfos['stikit'], "techLinks": jumboInfos['techLinks'], 
    "playLink": jumboInfos["playLinks"]});
});

app.get('/deepbeat', function(request, response)
{
	response.render("projectPages/deepbeat",{"project": jumboInfos['deepbeat'], "techLinks": jumboInfos['techLinks'], 
    "playLink": jumboInfos["playLinks"]});
});

app.get('/jetpack', function(request, response)
{
	response.render("projectPages/jetpack",{"project": jumboInfos['kiwi'], "techLinks": jumboInfos['techLinks'], 
    "playLink": jumboInfos["playLinks"]});
});

app.get('/attackvector', function(request, response)
{
    response.render("projectPages/attackvector",{"project": jumboInfos['attack_vector'], "techLinks": jumboInfos['techLinks'], 
    "playLink": jumboInfos["playLinks"]});
});

app.get('/powertower', function(request, response)
{
    response.render("projectPages/powertower",{"project": jumboInfos['tower'], "techLinks": jumboInfos['techLinks'], 
    "playLink": jumboInfos["playLinks"]});
});
