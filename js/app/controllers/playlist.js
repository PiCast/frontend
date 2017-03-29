'use strict';

/**
 * @ngdoc function
 * @name picastApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the picastApp
 */
angular.module('picastApp')
    .controller('PlaylistCtrl', ['$scope', 'PiCastService', '$rootScope', '$interval', '$timeout', function ($scope, PiCastService, $rootScope, $interval, $timeout) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        function shuffleArray(array) {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
            return array;
        }

        PiCastService.getPlaylist();
        $interval(PiCastService.getPlaylist, 10000);
        $scope.sortableOptions = {
            handle: '.cover-image',
            update: function () {
                PiCastService.updatePlaylist($scope.playlist);
            }
        };

        $scope.randomizePlaylist = function () {
            $scope.playlist = shuffleArray($scope.playlist);
            PiCastService.updatePlaylist($scope.playlist);
        };

        $rootScope.$on('player_playlist_update', function (evt, status) {
            $scope.playlist = status;
        });

        $rootScope.$on('action_nextqueue', function () {
            $timeout(PiCastService.getPlaylist, 250);
        });

        $scope.deleteVideo = function (video) {
            var idx = $scope.playlist.indexOf(video);
            $scope.playlist.splice(idx, 1);
            PiCastService.updatePlaylist($scope.playlist);
        }

    }]);