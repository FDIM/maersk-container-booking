'use strict';

// Declare app level module which depends on views, and components
angular.module('MCBApp', [
    'ngRoute',
    'ui.bootstrap',
    'localytics.directives',
    'mcb.booking.controllers',
    'mcb.booking.services'
]).
config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.otherwise({
            redirectTo: '/'
        });
}]).controller('AppController', ['$scope',
    function ($scope) {
        $scope.loading = true;
        $scope.$on('$routeChangeStart',function(){
            $scope.loading = true;
        });
        $scope.$on('$routeChangeSuccess', function () {
            $scope.loading = false;
        });
}]);
// some utils
Number.prototype.formatNumber = function (decPlaces, thouSeparator, decSeparator) {
    var n = this,
        decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
        decSeparator = decSeparator == undefined ? "." : decSeparator,
        thouSeparator = thouSeparator == undefined ? "," : thouSeparator,
        sign = n < 0 ? "-" : "",
        i = parseInt(n = Math.abs(+n || 0).toFixed(decPlaces)) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return sign + (j ? i.substr(0, j) + thouSeparator : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thouSeparator) + (decPlaces ? decSeparator + Math.abs(n - i).toFixed(decPlaces).slice(2) : "");
};
//http://stackoverflow.com/a/6274381/1642418
Array.prototype.shuffle = function () { //v1.0
    for (var j, x, i = this.length; i; j = Math.floor(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
    return this;
};