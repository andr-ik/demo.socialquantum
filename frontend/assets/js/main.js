'use strict';

var GlobalConfig = {
    isProduction: false,
    apiBaseUrl: 'http://api.demo.socialquantum.dev/'
};

angular.module('templates', []);

angular
    .module('app', [
        'templates',
        'restangular',
        'xeditable'
    ])
    .config(function(RestangularProvider){
        RestangularProvider.setBaseUrl(GlobalConfig.apiBaseUrl);
        RestangularProvider.setDefaultHttpFields({
            cache: true
        });
        RestangularProvider.setRequestSuffix('/');
        RestangularProvider.setFullResponse(false);
    })
    .run(function(editableOptions){
        editableOptions.theme = 'bs3';
    });

angular.element(document).ready(function(){
    angular.bootstrap(document, ['app'], {
        strictDi: true
    });
});
