/**
 * Created by Valentino on 12.12.2015..
 */
twitterApp.controller('HomeController', ['$scope', '$location', '$sce', '$anchorScroll', '$mdDialog', 'Socket', 'TwitterSearch', 'Paginator', function($scope, $location, $sce, $anchorScroll, $mdDialog, Socket, TwitterSearch, Paginator) {

    $scope.currentPage = Paginator.currentPage;
    $scope.itemsPerPage = Paginator.itemsPerPage;
    $scope.selectedIndex = 0;
    $scope.searchTerm = '';
    $scope.tabs = [];


    $scope.addTab = addTab;
    $scope.goLive = goLive;
    $scope.highlight = highlight;
    $scope.onTabSelected = onTabSelected;
    $scope.removeTab = removeTab;
    $scope.scrollTo = scrollTo;
    $scope.submit = submit;
    $scope.twitterSearch = twitterSearch;

    //cleanup work
    $scope.$on('destroy', function(){
        Socket.removeAllListeners();
    });

    //region Private methods

    function addTab(title, q){
        var tabs = $scope.tabs;
        var tab = {
            title: title,
            active: true,
            totalItems: 0,
            q: q,
            liveFeed: false
        };
        $scope.selectedIndex++;
        if (!dupes(tab)) {
            tabs.push(tab);
            $scope.tContent = '';
            $scope.tTitle = '';
            twitterSearch(q, tab);
        } else {
            alert('A search with this query already exists');
        }
    }

    function dupes(tab) {
        var tabs = $scope.tabs;
        for (var j = 0; j < tabs.length; j++) {
            if (tab.q == tabs[j].q) {
                return true;
            }
        }
        return false;
    }

    function goLive(q, tab){
        if(tab.liveFeed){
            spawnSearch(q, tab);
        }
        else {
            unsubscribe(q);
        }
    }

    function highlight(text, search){
        if (!search) {
            return $sce.trustAsHtml(text);
        }
        return $sce.trustAsHtml(text.replace(new RegExp(search, 'gi'), '<span class="highlightedText"><b>$&</b></span>'));
    }

    function onTabSelected(tab) {
        $scope.selectedIndex = this.$index;
        updateScope(tab);

    }

    function openModal(title, content){
        $mdDialog.show($mdDialog.alert()
                .parent(angular.element(document.body))
                .title(title)
                .ok("Ok")
                .clickOutsideToClose(true)
                .content(content)
        )
    }

    function removeTab(tab){
        var tabs = $scope.tabs;
        for (var j = 0; j < tabs.length; j++) {
            if (tab.title == tabs[j].title) {
                $scope.selectedIndex = (j == 0 ? 1 : j - 1);
                updateScope(tabs[j === 0 ? 1 : j - 1]);
                tabs.splice(j, 1);
                break;
            }
        }
    }

    function scrollTo(id){
        $location.hash(id);
        $anchorScroll();
    }

    function spawnSearch(q, tab) {
        Socket.emit('q', q);
        Socket.on('tweet_' + q, function (tweet) {
            if ($scope['tweets_' + q].length > 500) {
                $scope['tweets_' + q].shift();
            }
            var tweets = [];
            tweets.push(tweet);
            $scope['tweets_' + q] = tweets.concat($scope['tweets_' + q]);
            tab.totalItems++;

            updateScope(tab)
        });
    }

    function submit($event){
        if ($event.which !== 13) return;
        if ($scope.tTitle) {
            $scope.addTab($scope.tTitle, $scope.tContent);
        }
    }

    function twitterSearch(term, tab){
        TwitterSearch.search(term, function(data){
            $scope.searchTerm = term;
            $scope['tweets_' + term] = [];
            $scope['tweets_' + term] = data.statuses;
            tab.totalItems = data.statuses.length;
            if(tab.totalItems === 0){
                openModal('Nothing found', "<p>Unfortunately there are no search results for <b class=\"highlightedText\">#" + tab.q + "</b> you can still turn on live feed for possible results.</p>");
            }
            updateScope(tab);
        }, function(error){
            openModal('Error occurred!', "<p>" + error.message + "</p>");
        });
    }

    function unsubscribe(q){
        Socket.emit('remove', q);
    }

    function updateScope(tab) {
        if ($scope.tabs[$scope.selectedIndex] && $scope.tabs[$scope.selectedIndex].q == tab.q) {
            $scope.tweets = $scope['tweets_' + tab.q];
        }
    }

    //endregion
}
]);