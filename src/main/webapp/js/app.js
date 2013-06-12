'use strict';

/* App Module */

angular.module('scms', ['nodeFilters', 'rmsServices', 'ui.bootstrap']).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.
            when('/all', {templateUrl: 'partials/node-list.html', controller: AllNodesCtrl}).
            when('/boats/', {templateUrl: 'partials/boats/boat-list.html', controller: BoatsController, reloadOnSearch:false}).
            when('/test/', {templateUrl: 'partials/test.html', controller: TestController, reloadOnSearch:false}).
            when('/node/:nodeId', {templateUrl: 'partials/node-detail.html', controller: NodeDetailCtrl}).
            when('/new', {templateUrl: 'partials/node-create.html', controller: NodeCreateCtrl}).
            otherwise({redirectTo: '/all'});
    }]);
