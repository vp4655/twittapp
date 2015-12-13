/**
 * Created by Valentino on 12.12.2015..
 */
var twitterApp = angular.module('twitterApp', ['ngMaterial', 'btford.socket-io', 'ui.router', 'ui.bootstrap']);

twitterApp.config(function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'modules/partials/index.html',
            controller: 'HomeController'
        })

});