'use strict';
var commonDirectiveModule = angular.module('commonDirectiveModule', []);
/**********3分栏调整************/
commonDirectiveModule.directive('threeColumnsSplitter', function () {
    return {
        restrict: "A",
        replace: true,
        link: function (scope, element, attrs) {
        }
    }
});