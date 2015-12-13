/**
 * Created by Valentino on 12.12.2015..
 */
var twitterApp = angular.module('twitterApp', ['ngMaterial', 'btford.socket-io', 'ui.router', 'ui.bootstrap']);

twitterApp.config(function($locationProvider, $stateProvider, $urlRouterProvider){
    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'modules/partials/index.html',
            controller: 'HomeController'
        })

});