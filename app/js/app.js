'use strict';



// Declare app level module which depends on filters, and services
angular.module('cloudvisual', ['cloudvisual.filters', 'cloudvisual.services', 'cloudvisual.directives', 'cloudvisual.controllers']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/playlist', {templateUrl: 'partials/playlist.html', controller: 'PlayList'});
    $routeProvider.when('/search', {templateUrl: 'partials/search.html', controller: 'Search'});
    $routeProvider.otherwise({redirectTo: '/search'});
  }]);
