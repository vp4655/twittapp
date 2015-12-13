/**
 * Created by Valentino on 12.12.2015..
 */
twitterApp.factory('Socket', function(socketFactory){

    return socketFactory({
        ioSocket: io.connect('http://localhost:5000')
    })

});