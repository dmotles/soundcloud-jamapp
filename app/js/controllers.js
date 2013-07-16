'use strict';

/* Controllers */

angular.module('cloudvisual.controllers', []).
  controller('PlayList', [function() {

  }])
  .controller('Search', ['$scope', '$document', function($scope, $document) {
    $scope.search = {
      selected: 0
    };

    function onAjaxReply(tracks, err) {
      if(err) {
        console.log(err);
      } else {
        $scope.$apply(function() {
          $scope.tracks = tracks;
        });
      }
    }

    function moveDown() {
      $('#searchInput').blur();
      if($scope.search.selected < $scope.tracks.length - 1) {
        $scope.search.selected++;
      }
      return false;
    }

    function moveUp() {
      $('#searchInput').blur();
      if($scope.search.selected > 0) {
        $scope.search.selected--;
      }
      return false;
    }

    $scope.updateQuery = function(query) {
      /*
      
       Cant really use $http service until I have a server-side component
       due to cross-domain. The SC api is hosted on their domain so it doesnt
       whine.

       $http.get('https://api.soundcloud.com/tracks.json', {
        params: {
          client_id: 'd6de0043ca8b2163688482b2bfff11d9',
          q: query
        },
        cache: true
      }).
      success(function(data, status) {
        $scope.tracks = data;
      }).
      error(function(data, status) {
        if(status >= 500 && $scope.query === query) {
          setTimeout(function() {
            $scope.updateQuery(query);
          }, 500);
        } else {
          console.log("Error HTTP Status Code:", status);
        }
      });*/
      SC.get('/tracks', {q: query, limit: 10}, onAjaxReply);
      $scope.search.selected = 0;
    };

    $scope.keyDown = function(event) {
      console.log(event);
    };

    $document.bind('keydown', function(e) {
      $scope.$apply(function() {
        console.log(e);
        if(e.keyCode === 40) {
          return moveDown();
        } else if(e.keyCode === 38) {
          return moveUp();
        } else if(e.keyCode === 13) {
          SC.stream('/tracks/' + $scope.tracks[$scope.search.selected].id, {
            autoPlay: true
          });
        } else {
          $('#searchInput').focus();
        }
      });
    });
  }]);