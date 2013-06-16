'use strict';

/* Directives */
//angular.module('scms').
//    directive('xeditable', function ($timeout) {
//        return {
//            restrict: 'A',
//            require: "ngModel",
//            link: function (scope, element, attrs, ngModel) {
//                var loadXeditable = function () {
//                    console.log("xeditable loading...");
//                    angular.element(element).editable({
//                        display: function (value, srcData) {
//                            ngModel.$setViewValue(value);
//
//                            // Added date check
//                            if (!(value instanceof Date)) element.html(value);
//
//                            scope.$apply();
//                        }
//                    });
//                }
//                $timeout(function () {
//                    loadXeditable();
//                }, 10);
//            }
//        };
//    });