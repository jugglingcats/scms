'use strict';

/* Services */

var services = angular.module('rmsServices', ['ngResource']);

// Node
services.factory('Node', function ($resource) {
    return $resource('db/data/node/:nodeId', {}, {
        create: {method: "POST"}
    });
});

// Cypher
services.factory('Cypher', function ($resource, Node) {
    return $resource('db/data/cypher', {}, {
        query: {
            method: "POST",
            isArray: true,
            transformResponse: function (response) {
                var retval=JSON.parse(response).data.map(function(item) { return new Node(item[0]); });
                return retval;
            }
        }
    });
});