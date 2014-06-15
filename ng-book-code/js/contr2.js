/**
 * Created by Michal on 6/15/2014.
 */
var emailParser = angular.module('emailParser', [])
  .config(['$interpolateProvider',
    function($interpolateProvider) {
      $interpolateProvider.startSymbol('__');
      $interpolateProvider.endSymbol('__');
    }])
  .factory('EmailParser', ['$interpolate',
    function($interpolate) {
      // a service to handle parsing
      return {
        parse: function(text, context) {
          var template = $interpolate(text);
          return template(context);
        }
      }
    }]);




var app = angular.module('app', ['emailParser']);


app.controller('MyInterpolateController',
  ['$scope', 'EmailParser',
    function($scope, EmailParser) {
      $scope.$watch('emailBody', function (body) {
        if (body) {
          $scope.previewText =
            EmailParser.parse(body, {
              to: $scope.to
            });
        }
      });
    }]);