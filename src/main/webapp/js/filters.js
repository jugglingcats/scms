'use strict';

/* Filters */

angular.module('nodeFilters', []).filter('self', function () {
    var prefix = "http://5673cbad6.hosted.neo4j.org:7387/db/data/node/";
    var len = prefix.length;
    return function (node) {
        if ( node.self ) {
            return node.self.substr(len);
        } else {
            return node[0].self.substr(len);
        }
    };
});
