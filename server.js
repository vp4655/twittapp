var express = require('express');
var app = express();
var server = require('http').Server(app);
var path = require('path');
var config = require('./config/config');
var searches = {};

app.set('views', path.join(__dirname, 'public'));
app.use(express.static(app.get('views')));

//configure middleware
require('./server/config/server.config')(app);

require('./server/router')(app);

require('./server/socket.io')(app, server);

server.listen(config.NODE_PORT);
console.log('Server listening on port ' + config.NODE_PORT);