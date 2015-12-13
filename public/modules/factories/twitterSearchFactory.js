/**
 * Created by Valentino on 13.12.2015..
 */
twitterApp.factory('TwitterSearch', ['$http', function($http){
    return {
        search: function(term, success, error){
            $http.get('/api/search', {params: {searchTerm: term}}).success(success).error(error);
        }
    };
}]);