/**
 * Created by Valentino on 13.12.2015..
 */
var http = require('http');

exports.search = function(request, response){
    var twit = request.app.get('twitter');
    var term = request.query.searchTerm;
    console.log(term);
    twit.get('search/tweets', {q: term, count: 200}, function(error, data, res){
        response.send(data);
    });
};