'use strict';

angular.module('mcb.booking.services', [])
    .service('BookingService', ['$q',

        function ($q) {
            return {
                getMaxNumberOfContainers: function () {
                    return 1000;
                },
                getMaxDate: function () {
                    var d = new Date();
                    d.setDate(d.getDate() + 365); // ~ 1 year
                    return d;
                },
                getCommodities: function () {
                    var d = $q.defer();
                    setTimeout(function () {
                        d.resolve([

                            {
                                name: 'Sugar'
                        }, {
                                name: 'Corn'
                        }, {
                                name: 'Oats'
                        }, {
                                name: 'Rice'
                        }, {
                                name: 'Soybeans'
                        }, {
                                name: 'Rapeseed'
                        }, {
                                name: 'Wheat'
                        }, {
                                name: 'Cocoa'
                        }, {
                                name: 'Coffee'
                        }]);

                    }, globalTimeout);
                    return d.promise;
                },
                getDestinations: function (origin) {
                    var d = $q.defer();
                    setTimeout(function () {
                        d.resolve([
                            {
                                name: 'Aarhus',
                                region: 'Europe'
                            },
                            {
                                name: 'Algeciras',
                                region: 'Europe'
                            },
                            {
                                name: 'Bremerhaven',
                                region: 'Europe'
                            },
                            {
                                name: 'Gdańsk',
                                region: 'Europe'
                            },
                            {
                                name: 'Gioia Tauro',
                                region: 'Europe'
                            },
                            {
                                name: 'Gothenburg',
                                region: 'Europe'
                            },
                            {
                                name: 'Le Havre',
                                region: 'Europe'
                            },
                            {
                                name: 'Oslo',
                                region: 'Europe'
                            },
                            {
                                name: 'Portsmouth',
                                region: 'Europe'
                            },
                            {
                                name: 'Port of Poti',
                                region: 'Europe'
                            },
                            {
                                name: 'Rotterdam',
                                region: 'Europe'
                            },
                            {
                                name: 'Zeebrugge',
                                region: 'Europe'
                            },
                            {
                                name: 'Port of Montreal',
                                region: 'North America'
                            },
                            {
                                name: 'Charleston',
                                region: 'North America'
                            },
                            {
                                name: 'Houston',
                                region: 'North America'
                            },
                            {
                                name: 'Jacksonville',
                                region: 'North America'
                            },
                            {
                                name: 'Los Angeles',
                                region: 'North America'
                            },
                            {
                                name: 'Miami',
                                region: 'North America'
                            },
                            {
                                name: 'Mobile',
                                region: 'North America'
                            },
                            {
                                name: 'Port Elizabeth',
                                region: 'North America'
                            },
                            {
                                name: 'Portsmouth',
                                region: 'North America'
                            },
                            {
                                name: 'Tacoma',
                                region: 'North America'
                            },
                            {
                                name: 'Buenos Aires',
                                region: 'South America'
                            },
                            {
                                name: 'Itajai',
                                region: 'South America'
                            },
                            {
                                name: 'Pecem',
                                region: 'South America'
                            },
                            {
                                name: 'Callao',
                                region: 'South America'
                            },
                            {
                                name: 'Aqaba',
                                region: 'Middle East'
                            },
                            {
                                name: 'Bahrain',
                                region: 'Middle East'
                            },
                            {
                                name: 'Port Said',
                                region: 'Middle East'
                            },
                            {
                                name: 'Cai Mep',
                                region: 'Asia'
                            },
                            {
                                name: 'Colombo',
                                region: 'Asia'
                            },
                            {
                                name: 'Dalian',
                                region: 'Asia'
                            },
                            {
                                name: 'Guangzhou',
                                region: 'Asia'
                            },
                            {
                                name: 'Kobe',
                                region: 'Asia'
                            },
                            {
                                name: 'Laem Chabang',
                                region: 'Asia'
                            },
                            {
                                name: 'Pipavav',
                                region: 'Asia'
                            },
                            {
                                name: 'Mumbai',
                                region: 'Asia'
                            },
                            {
                                name: 'Qingdao',
                                region: 'Asia'
                            },
                            {
                                name: 'Tanjung Pelepas',
                                region: 'Asia'
                            },
                            {
                                name: 'Tianjin',
                                region: 'Asia'
                            },
                            {
                                name: 'Shanghai',
                                region: 'Asia'
                            },
                            {
                                name: 'Xiamen',
                                region: 'Asia'
                            },
                            {
                                name: 'Yokohama',
                                region: 'Asia'
                            },
                            {
                                name: 'Abidjan',
                                region: 'Africa'
                            },
                            {
                                name: 'Apapa',
                                region: 'Africa'
                            },
                            {
                                name: 'Cotonou',
                                region: 'Africa'
                            },
                            {
                                name: 'Douala',
                                region: 'Africa'
                            },
                            {
                                name: 'Luanda',
                                region: 'Africa'
                            },
                            {
                                name: 'Monrovia',
                                region: 'Africa'
                            },
                            {
                                name: 'Onne',
                                region: 'Africa'
                            },
                            {
                                name: 'Pointe Noire',
                                region: 'Africa'
                            },
                            {
                                name: 'Port Elizabeth',
                                region: 'Africa'
                            },
                            {
                                name: 'Tangier',
                                region: 'Africa'
                            },
                            {
                                name: 'Tema',
                                region: 'Africa'
                            }
                        ]);
                    }, globalTimeout);
                    return d.promise;
                },
                search: function (quantity, commodity, origin, destination, departureDate, arrivalDate) {
                    if (!(quantity && commodity && origin && destination && departureDate && arrivalDate)) {
                        throw new Error("All parameters must be specified");
                    }
                    if(origin.name == destination.name){
                        throw new Error("Origin and destination is the same place!");
                    }
                    if (departureDate > arrivalDate) {
                        var tmp = departureDate;
                        departureDate = arrivalDate;
                        arrivalDate = tmp;
                    }
                    var d = $q.defer();
                    setTimeout(function () {
                        // create a list of random dates and random prices
                        var res = [];
                        if((arrivalDate - departureDate)/(60*60*1000)>=24){
                            var partialRes = [];
                            var date = new Date(departureDate);
                            var fn = function () {
                                //randomize array
                                partialRes.shuffle();
                                //take 1-3 elements from the array and create dummy record
                                for (var i = 0; i < 1 + 2 * Math.random() && i < partialRes.length; i++) {
                                    res.push({
                                        date: partialRes[i],
                                        price: (1000 + 2000 * Math.random()) * quantity,
                                        quantity: quantity,
                                        commodity: commodity,
                                        origin: origin,
                                        destination: destination,
                                        departureDate: departureDate,
                                        arrivalDate: arrivalDate
                                    });
                                }
                                partialRes = [];
                            }
                            while (date <= arrivalDate) {
                                // collect dates in partial list of 7, then take 2 or 3 random ones and put them to the result
                                if (partialRes.length == 7) {
                                    fn();
                                } else {
                                    partialRes.push(new Date(date));
                                }
                                // go through each day between two dates
                                date.setDate(date.getDate() + 1);
                            }
                            //deal with remaining days
                            if (partialRes.length > 0) {
                                fn();
                            }
                        }
                        d.resolve(res);
                    }, globalTimeout);
                    return d.promise;
                },
                // emulate allotment booking
                book: function (allotment) {
                    var d = $q.defer();
                    setTimeout(function () {
                        d.resolve(true);
                    }, globalTimeout * 3);
                    return d.promise;
                }
            };
}])