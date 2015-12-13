/**
 * Created by Valentino on 13.12.2015..
 */
module.exports = function(app, socket, searches){
    var T = app.get('twitter');
    socket.on('q', function(q) {

        if (!searches[socket.id][q]) {
            console.log('New Search >>', q);

            var stream = T.stream('statuses/filter', {
                track: q
            });

            stream.on('tweet', function(tweet) {
                //console.log(q, tweet.id);
                socket.emit('tweet_' + q, tweet);
            });

            stream.on('limit', function(limitMessage) {
                console.log('Limit for User : ' + socket.id + ' on query ' + q + ' has rechead!');
            });

            stream.on('warning', function(warning) {
                console.log('warning', warning);
            });

            stream.on('reconnect', function(request, response, connectInterval) {
                console.log('reconnect :: connectInterval', connectInterval)
            });

            stream.on('disconnect', function(disconnectMessage) {
                console.log('disconnect', disconnectMessage);
            });

            searches[socket.id][q] = stream;
        }
    });

    socket.on('remove', function(q) {
        searches[socket.id][q].stop();
        delete searches[socket.id][q];
        console.log('Removed Search >>', q);
    });

    socket.on('disconnect', function() {
        for (var k in searches[socket.id]) {
            searches[socket.id][k].stop();
            delete searches[socket.id][k];
        }
        delete searches[socket.id];
        console.log('Removed All Search from user >>', socket.id);
    });
};