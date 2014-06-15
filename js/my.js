/**
 * Created by Michal on 6/13/2014.
 */
var HelloCtrl = function($scope) {
  $scope.name = 'World';
  $scope.getName = function() {
    return $scope.name;
  };
};

var WorldCtrl = function($scope) {
  $scope.population = 7000;
  $scope.countries = [
    {name : 'France', population: 63.1},
    {name : 'United Kingdom', population: 61.8}
  ];

  $scope.worldsPercentage = function(countryPopulation) {
    return (countryPopulation / $scope.population) * 100;
  };
};

var TextAreaWithLimitCtrl = function($scope) {
  $scope.MAX_LEN = 100;
  $scope.WARN_THRESHOLD = 90;
  $scope.remaining = function() {
    return $scope.MAX_LEN - $scope.message.length;
  };
  $scope.shouldWarn = function () {
    return $scope.remaining() < WARN_THRESHOLD;
  };

};