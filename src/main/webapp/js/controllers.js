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

function TestController($scope, $routeParams) {
    console.log("got it");
    $scope.name="xyz";
}

function BoatsController($scope, $routeParams, $location, $timeout, Cypher, Finder) {
    function update() {
        var name=$routeParams.boatName;
        if ( name != $scope.selectedName ) {
            $scope.selectedName=name;
            if ( name && name.length > 0 )
                $scope.selected=Finder.findByProperties({type: 'boat', name: name});
        }
    }
    $scope.boats=Cypher.query({}, {"query": "start n=node(*) where has(n.type) and n.type='boat' return n"});

    $scope.selectedName=null;

    $scope.$on('$routeUpdate', function(value) {
        update();
    });

    update();

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