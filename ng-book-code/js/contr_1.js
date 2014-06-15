/**
 * Created by Michal on 6/15/2014.
 */

var app = angular.module('app', []);

app.controller('FirstController', function($scope) {
  $scope.counter = 0;
  $scope.add = function(amount) { $scope.counter += amount; };
  $scope.subtract = function(amount) { $scope.counter -=  amount;};
});

app.controller('MyController', function($scope) {
  $scope.person = {
    name: 'Crazy Mike'
  };
});

app.controller('ParentController', function($scope) {
  $scope.person = {greeted: false};
});

app.controller('ChildController', function($scope) {
  $scope.sayHello = function() {
    $scope.person.name = 'Crazy Mike';
    $scope.person.greeted = true;
  }
});

app.controller('MyexprController', function($scope, $parse) {
  $scope.$watch('expr', function(newVal, oldVal, scope) {
    if (newVal !== oldVal) {
      // Let's set up our parseFun with the expression
      var parseFun = $parse(newVal);
      // Get the value of the parsed expression
      $scope.parsedValue = parseFun(scope);
    }
  });
});

