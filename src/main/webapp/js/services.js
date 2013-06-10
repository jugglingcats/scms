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
                var retval = JSON.parse(response).data.map(function (item) {
                    return new Node(item[0]);
                });
                return retval;
            }
        },
        find: {
            method: "POST",
            isArray: false,
            transformResponse: function (response) {
                // TODO: H: handle empty results
                var results = JSON.parse(response).data;
                return new Node(results[0][0]);
            }
        }
    });
});

services.service('Finder', function (Cypher) {
    this.findByProperties = function (props) {
        var q = "";
        angular.forEach(props, function (value, key) {
            if (q.length > 0) {
                q += " and";
            }
            var expr = "n." + key;
            // TODO: escape value
            q += " has(" + expr + ") and " + expr + "='" + value + "'"
        });
        q = "start n=node(*) where" + q + " return n";
        return Cypher.find({}, {query: q});
    };
});