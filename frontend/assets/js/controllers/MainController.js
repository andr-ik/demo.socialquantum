(function () {
    'use strict';

    angular
        .module('app')
        .controller('MainController', function($scope, $q, $timeout, People, Country){
            $scope.peoples = [];
            $scope.countries = [];

            var people = People.findAll();
            people.then(function(data){
                $scope.peoples = data.items;
            });
            var country = Country.findAll();
            country.then(function(data){
                $scope.countries = data.items;
            });

            $q.all(people, country).then(function(){
                $timeout(function(){
                    angular.element('.main-template').css('opacity', 1);
                }, 400);
            });
        });

})();