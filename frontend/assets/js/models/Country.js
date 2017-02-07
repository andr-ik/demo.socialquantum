(function(){
'use strict';

	angular
	.module('app')
	.service('Country', function($q, Restangular){
		return {
			findAll: function(){
				return Restangular.all('country').customGET();
			},
			find: function(params){
				return Restangular.one('country',params.id).get();
			}
		};
	})

})();