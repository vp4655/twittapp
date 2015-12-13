/**
 * Created by Valentino on 13.12.2015..
 */
module.exports = function(app, server){
    var io = require('socket.io')(server);

    var searches = {};

    io.on('connection', function(socket) {
        searches[socket.id] = {};

        require('./controllers/server.socketController')(app, socket, searches);

    });
};