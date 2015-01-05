'use strict';
var globalTimeout = 1000;
angular.module('mcb.booking.controllers', ['ngRoute'])

.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'booking/view.html',
            controller: 'BookingCtrl'
        });
}])
    .filter('currency', function () {
        return function (input) {
            return '$' + (input * 1).formatNumber(2, ',', '.');
        };
    })
    .controller('BookingCtrl', ['$scope', 'BookingService',
    function ($scope, service) {
            $scope.results = undefined;
            $scope.searching = false;
            $scope.booking = false;
            $scope.bookedAllotment = undefined;
            $scope.pendingAllotment = undefined;
            $scope.cheapestFirst = false;
            $scope.search = function ($event, quantity, commodity, origin, destination, departureDate, arrivalDate) {
                $scope.searching = true;
                $scope.pendingAllotment = undefined;
                service.search(quantity, commodity, origin, destination, departureDate, arrivalDate).then(function (res) {
                    $scope.results = res;
                    $scope.searching = false;
                    // scroll to results, doesnt look too nice though... :/
                    if ($(window).width() < 480) {
                        setTimeout(function () {
                            $('html, body').stop().animate({
                                'scrollTop': $('#booking .results-container').offset().top
                            }, 500);
                        }, 300);
                    }
                });
            };
            $scope.prompt = function ($event, allotment) {
                $scope.pendingAllotment = allotment;
                // scroll to results, doesnt look too nice though... :/
                setTimeout(function () {
                    $('html, body').stop().animate({
                        'scrollTop': $('#booking .results-container .prompt-dialog').offset().top
                    }, 500);
                }, 50);
            };
            $scope.cancel = function () {
                $scope.pendingAllotment = undefined;
            };
            $scope.book = function ($event, allotment) {
                $scope.pendingAllotment = undefined;
                $scope.booking = true;
                service.book(allotment).then(function () {
                    $scope.booking = false;
                    $scope.bookedAllotment = allotment;
                });
            };
            $scope.reset = function () {
                $scope.bookedAllotment = undefined;
                $scope.results = undefined;
            }
}]).controller('SearchCtrl', ['$scope', 'BookingService',
    function ($scope, service) {
            $scope.destinations = [];
            service.getDestinations().then(function (res) {
                $scope.destinations = res;
            });
            $scope.commodities = [];
            service.getCommodities().then(function (res) {
                $scope.commodities = res;
            });
            $scope.minDate = new Date();
            $scope.maxDate = service.getMaxDate();

            $scope.quantity = '1';
            $scope.commodity = undefined;
            $scope.origin = undefined;
            $scope.destination = undefined;

            $scope.departureDate = new Date();
            $scope.arrivalDate = new Date();
            $scope.arrivalDate.setDate($scope.arrivalDate.getDate() + 31);

            $scope.departureDatePickerVisible = false;
            $scope.arrivalDatePickerVisible = false;

            $scope.format = "MMMM dd, yyyy";
            $scope.dateOptions = {
                formatYear: 'yy',
                startingDay: 1
            };
            $scope.showDepartureDatePicker = function ($event) {
                $event.preventDefault();
                $event.stopPropagation();

                $scope.arrivalDatePickerVisible = false;
                $scope.departureDatePickerVisible = true;
            };

            $scope.showArrivalDatePicker = function ($event) {
                $event.preventDefault();
                $event.stopPropagation();

                $scope.departureDatePickerVisible = false;
                $scope.arrivalDatePickerVisible = true;
            };
            $scope.$watch('quantity', function () {
                if ($scope.quantity > service.getMaxNumberOfContainers()) {
                    $scope.quantity = service.getMaxNumberOfContainers();
                } else if ($scope.quantity < 1) {
                    $scope.quantity = 1;
                }
            });
            // ensure that arrival date is more than departure
            $scope.$watch('departureDate', function () {
                if ($scope.departureDate > $scope.arrivalDate) {
                    $scope.arrivalDate = new Date($scope.departureDate);
                    $scope.arrivalDate.setDate($scope.arrivalDate.getDate() + 31);
                }
            });
}]).controller('ResultsCtrl', ['$scope',
    function ($scope) {

}]);