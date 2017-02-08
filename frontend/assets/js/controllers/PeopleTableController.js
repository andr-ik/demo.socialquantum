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

            $scope.sort = {
                'name': -1,
                'phone': 0,
                'country': 0
            };

            $scope.showCountry = function(people){
                return people.country ? people.country.title : 'empty';
            };

            $scope.showPhone = function(people){
                return people.phone ? people.phone : 'empty';
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
                    $scope.clearSort();
                    $scope.peoples.push($scope.inserted);
                }
            };

            $scope.setSort = function(type){
                if($scope.sort[type] === 0){
                    $scope.clearSort();
                    $scope.sort[type] = 1;
                }else{
                    $scope.sort[type] *= -1;
                }

                console.log($scope.sort);
            };

            $scope.clearSort = function(){
                for(var sort in $scope.sort){
                    if($scope.sort.hasOwnProperty(sort)){
                        $scope.sort[sort] = 0;
                    }
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
                // $scope.filterAndSortPeoples
                ($scope.peoples).forEach(function(people, i){
                    if(people.id ===  data.id){
                        result.index = i;
                        result.values = people;
                    }
                });
                console.log(result);
                return result;
            };

            /**
             * Сохраняет данные о человеке
             * @param data
             */
            $scope.savePeople = function(data, id){
                data = angular.extend(data, {id: id});
                data.country_id = data.country.id;
                var is_inserted = id ? false : true;
                People.save(data).then(function(data){
                    if(is_inserted){
                        $scope.inserted.id = data.id;
                    }
                    delete $scope.inserted;
                });
            };

            /**
             * Удаляет данные о человеке
             * @param index
             * @param data
             */
            $scope.removePeople = function(index, data){
                var find = $scope.findPeople(data);
                People.delete(find.values);
                $scope.peoples.splice(find.index, 1);
            };

            /**
             * Фильтрует и сортирует список людей по данным из $scope.search и $scope.sort
             * @param peoples
             */
            $scope.filterAndSortPeoples = function(peoples){
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
                var sortType = null;
                for (var sort in $scope.sort) {
                    if ($scope.sort.hasOwnProperty(sort)) {
                        if ($scope.sort.hasOwnProperty(sort) && Math.abs($scope.sort[sort]) === 1) {
                            sortType = sort;
                        }
                    }
                }
                result.sort(function (people1, people2) {
                    if (sortType === 'country') {
                        if ($scope.sort[sortType] === 1) {
                            return people1[sortType]['title'] > people2[sortType]['title'];
                        } else {
                            return people1[sortType]['title'] < people2[sortType]['title'];
                        }
                    } else {
                        if ($scope.sort[sortType] === 1) {
                            return people1[sortType] > people2[sortType];
                        } else {
                            return people1[sortType] < people2[sortType];
                        }
                    }

                });
                return result;
            }
        });

})();