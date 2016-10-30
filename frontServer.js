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

var projectCardHeaders = require('./src/js/cardHeaders.json');
var jumboInfos = require('./src/js/projectHeaders.json');

app.set('view engine', 'pug');
app.set('views', __dirname + '/src/templates/');

app.listen(3000, function()
{
   console.log("We did it on 3000");
});

app.get('/', function(request, response)
{
   response.render('index',{"cardHeaders": projectCardHeaders});
});

app.get('/about', function(request, response)
{
    response.render('about');
});

app.get('/contact', function(request, response)
{
    response.render('contact');
});

//project pages

app.get('/LTree', function(request, response)
{
	response.render("projectPages/lTree",{"project": jumboInfos['balrog'], "techLinks": jumboInfos['techLinks'], "playLink": jumboInfos["playLinks"]});
});

app.get('/attackVector', function(request, response)
{
	response.render("projectPages/lTree",{"project": jumboInfos['attack_vector'], "techLinks": jumboInfos['techLinks'], 
    "playLink": jumboInfos["playLinks"]});
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