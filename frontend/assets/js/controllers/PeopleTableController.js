(function () {
    'use strict';

    angular
        .module('app')
        .controller('PeopleTableController', function($scope, People){

            $scope.search = {
                name: '',
                phone: '',
                country: null
            };

            $scope.showCountry = function(people){
                return people.country ? people.country.title : 'empty';
            };

            $scope.checkName = function(name, people_id){
                if(!name){
                    return "Укажите имя";
                }
            };

            $scope.checkPhone = function(phone, people_id){
                if(!phone){
                    return "Укажите телефон";
                }
            };

            $scope.checkCountry = function(country, people_id){
                if(!country || !country.id){
                    return "Укажите страну";
                }
            };

            $scope.addPeople = function() {
                if(!$scope.inserted || $scope.inserted.id){
                    $scope.inserted = {
                        id: null,
                        name: '',
                        phone: '',
                        country: null
                    };
                    $scope.peoples.push($scope.inserted);
                }
            };

            /**
             * Вернет человека по его id
             * @param data
             * @returns {{index: number}}
             */
            $scope.findPeople = function(data){
                var result = {
                    index: -1,
                    values: null
                };
                $scope.filterPeoples($scope.peoples).forEach(function(people, i){
                    if(people.id ===  data.id){
                        result.index = i;
                        result.values = people;
                    }
                });
                return result;
            };

            /**
             * Сохраняет данные о человеке
             * @param data
             */
            $scope.savePeople = function(data){
                data.country_id = data.country.id;
                People.save(data).then(function(data){
                    $scope.inserted.id = data.id;
                    delete $scope.inserted;
                });
            };

            /**
             * Удаляет данные о человеке
             * @param index
             * @param data
             */
            $scope.removePeople = function(index, data){
                People.delete($scope.findPeople(data).values);
                $scope.peoples.splice(index, 1);
            };

            /**
             * Фильтрует список людей по данным из $scope.search
             * @param peoples
             */
            $scope.filterPeoples = function(peoples){
                var result = [];
                angular.forEach(peoples, function(people, index) {
                    if(( people.id && people.name.indexOf($scope.search.name) > -1 ) && ( people.phone.indexOf($scope.search.phone) > -1 )){
                        if( $scope.search.country && $scope.search.country.id){
                            if(people.country && people.country.id === $scope.search.country.id){
                                result.push(people);
                            }
                        }else{
                            result.push(people);
                        }
                    }
                    if(!people.id){
                        result.push(people);
                    }
                });
                return result;
            }
        });

})();