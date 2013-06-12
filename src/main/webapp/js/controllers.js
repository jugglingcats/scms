'use strict';

/* Controllers */

function AllNodesCtrl($scope, Cypher) {
    $scope.nodes=Cypher.query({}, {"query": "start n=node(*) return n"});
//    $http.post('db/data/cypher', {
//        "query": "start n=node(*) return n"
//    }).success(function (response) {
//            $scope.nodes = response.data;
//        });
//    $scope.nodes = nodesvc.all();
}

//PhoneListCtrl.$inject = ['$scope', 'Phone'];

function NodeDetailCtrl($scope, $routeParams, Node) {
    $scope.node = Node.get({nodeId: $routeParams.nodeId}, function (node) {
    });
}

function NodeCreateCtrl($scope, $location, $filter, Node) {
    $scope.create=function(node) {
        console.log("create");
        Node.create({}, node, function(result) {
            $location.path("/node/"+$filter("self")(result));
        });
    }
}

function TestController($scope, $routeParams, $location, Cypher, Finder) {
    console.log("controller created");
}

function BoatsController($scope, $routeParams, $location, Cypher, Finder) {
    console.log("search: "+JSON.stringify($location.search()));

    $scope.boats=Cypher.query({}, {"query": "start n=node(*) where has(n.type) and n.type='boat' return n"});

//    $scope.$on('$routeUpdate', function(value) {
//        $scope.params = $routeParams;
//    });

//    if ( $routeParams.boatName ) {
//        // TODO: escape the name
//        $scope.selected=Finder.findByProperties({type: 'boat', name: $routeParams.boatName});
//    }

    $scope.openNewBoatDialog = function() {
        console.log("opening");
        $scope.newBoatDialog=true;
    }

    $scope.newBoatDialogOptions= {
        backdropFade: true,
        dialogFade: false
    };

    $scope.createBoat = function() {
        console.log(Node);
        $scope.selected=Node.save({}, {
            type: "boat",
            name: $scope.name
        });
        $scope.newBoatDialog=false;
    }

    $scope.closeNewBoatDialog = function() {
        $scope.newBoatDialog=false;
    }
}