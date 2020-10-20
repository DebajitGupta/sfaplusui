(function () {
    'use strict'
    angular
        .module('app')
        .factory('SubscibtionModelSrvc', ['$http', '$q', function ($http, $q) {
            var service = {};

            service.GetSubscibtionModeldata = function (dataParam) {
                var deferred = $q.defer();
                $http.post('http://localhost:51606/api/subs/data', dataParam).then(function (result) {
                    deferred.resolve(result.data);
                }, function () {
                    deferred.reject();
                });
                return deferred.promise;
            };

            return service;
        }]);
})();


