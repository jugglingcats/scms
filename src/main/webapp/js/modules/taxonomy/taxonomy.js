angular.module("com.akirkpatrick.scms.taxonomy", []).directive('taxonomy-select', function () {
    return {
        restrict:'E',
        templateUrl:'template/taxonomy/taxonomy-select.html',
        transclude:true,
        replace:true,
        scope: {
            type: '=',
            close: '&'
        },
        link: function(scope, iElement, iAttrs, controller) {
            scope.closeable = "close" in iAttrs;
        }
    };
});