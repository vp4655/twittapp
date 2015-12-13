var express = require('express');
var app = express();
var server = require('http').Server(app);
var path = require('path');
var consolidate = require('consolidate');
//var io = require('socket.io')(server);
var searches = {};

app.set('views', path.join(__dirname, 'public'));
app.use(express.static(app.get('views')));

//configure middleware
require('./server/config/server.config')(app);

require('./server/router')(app);

require('./server/socket.io')(app, server);

/*var T = app.get('twitter');

// Sockets
io.on('connection', function(socket) {
    searches[socket.id] = {};


});*/

server.listen(3000);
console.log('Server listening on port 3000');