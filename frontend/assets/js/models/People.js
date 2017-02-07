(function(){
'use strict';

	angular
	.module('app')
	.service('People', function($q, Restangular){
		return {
			findAll: function(){
				return Restangular.all('people').customGET();
			},
			find: function(params){
				return Restangular.one('people',params.id).get();
			},
			save: function(params){
				if(params.id){
					return Restangular.one('people', params.id).customPUT(params);
				}else{
					return Restangular.all('people').customPOST(params);
				}
			},
			delete: function(params){
				if(params.id) {
					return Restangular.one('people', params.id).customDELETE();
				}
			}
		};
	})

})();