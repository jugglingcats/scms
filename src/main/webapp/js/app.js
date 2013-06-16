'use strict';

/* App Module */

angular.module('scms', ['nodeFilters', 'rmsServices', 'ui.bootstrap']).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.
            when('/all', {templateUrl: 'partials/node-list.html', controller: AllNodesCtrl}).
            when('/boats/', {templateUrl: 'partials/boats/boat-list.html', controller: BoatsController, reloadOnSearch: false}).
            when('/test', {templateUrl: 'testx.html', controller: TestController, reloadOnSearch: false}).
            when('/node/:nodeId', {templateUrl: 'partials/node-detail.html', controller: NodeDetailCtrl}).
            when('/new', {templateUrl: 'partials/node-create.html', controller: NodeCreateCtrl}).
            otherwise({redirectTo: '/all'});
    }]).
    directive('xeditable', function ($timeout) {
        return {
            restrict: 'A',
            require: "ngModel",
            link: function (scope, element, attrs, ngModel) {
                var loadXeditable = function () {
                    console.log("xeditable loading...");
                    angular.element(element).editable({
                        display: function (value, srcData) {
                            ngModel.$setViewValue(value);

                            // Added date check
                            if (!(value instanceof Date)) element.html(value);

                            scope.$apply();
                        }
                    });
                }
                $timeout(function () {
                    loadXeditable();
                }, 10);
            }
        };
    });;
