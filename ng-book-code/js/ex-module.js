/**
 * Created by Michal on 6/14/2014.
 */
/**
 * Use module for:
 * -> keep namespace clean
 * -> Make tests easier to write and keeping them clean - target isolated funcionality
 * -> make it easy to share code between applications
 */

// MODULES
//angular.module('myApp', []); // define module, setter method for Angular module;
//angular.module('myApp'); // possible also, without
// Properties   -> angular modules have properties that we can use to inspect the module
// name(string) -> The name property on the modules gives us the name of the module as a string
// requires(array of strings) -> Contains list of modules
// that the injector loads BEFORE the module itself

// SCOPES
// $scope object is where we define the business funcionality of the
// application the methods in controllers and properties in the views
// Scopes serve as a GLUE between controller and view. Before the view is rendered,
// the view template links to scope and app sets up the DOM to notify Angular for property changes
// Angular starts to run -> it will create a binding from the root ng-app
// element to the $rootScope. This $rootScope is the eventual parent of all $scope objects
// $rootScope -> kinda global context in Angular app
// $scope object -> plain old Javascript object. Can change properties on $scope object.
// $scope object -> data model in Angular
// ALL properties found on $scope object -> automatically accessible to the view

/*
angular.module('myApp', [])
  .run(function($rootScope) {
    $rootScope.name = "World";
  });
*/
// SCOPES do:
// provide OBSERVERS to watch model changes
// provide ability to propagate model changes through application as well outside system to other components
// They can be nested such that they can isolate funcionality and model properties
// They provide an execution env in which expressions are evaluates
//

var app = angular.module("myApp", []);

app.controller('MyController', function($scope) {
  $scope.name = "Mike";
});
// **GOOD FORM** - declared inside module

// when browser receives JS callback that executes inside of Angular execution context
// -> $scope will be made aware of model mutation
// if outside -> we can force $scope to have knowledge of change using $apply
// after scope expression is evaluated -> $digest loop runs, $scope expressions will run dirty checking

// CREATION -> when we create a controller or directive, Angular creates a new scope with $injector and
// passes new scope for controller or directive at runtime

// LINKING -> when $scope is linked to view, all directives that create $scopes will register their watches
// on parent scope. These watches watch and propagate model changes from view to directive.

// UPDATING During $digest cycle, which executes on $rootScope, all children scopes will perform
// dirty checking. All watching expressions are checked for any changes
// and scope call listeners callback on changes.

// DESTRUCTION $scope is no longer needed -> child scope creator will call $scope.destroy()
// note: when scope is destroyed -> $destroy event will be broadcasted.

// DIRECTIVES -> generally do not create their own scopes
// exceptions: ng-controller and ng-repeat create their own child scopes

// CONTROLLERS
// in AngularJS controllers is a function that adds functionality to scope of view.
// Can be used to set up initial state and add custom behavior to scope object.
// When creating controller -> Angular passes it a new $scope.
// Best practice -> keep controllers as slim as possible


/* Like this:
function FirstController($scope) {
  $scope.message = "hello";
}
(POOR FORM) - declared in global scope
 */
// naming best-practice : [Name]Controller *rather* that [Name]Ctrl

// to bind buttons or links use ** ng-click
// ng-click directive binds mouseup browser click event to method handler

// SCOPE created inside directive is called isolate scope - they have no $parent scope
// by default for any property that AngularJS cannot find on local scope, AngularJS will
// crawl up to containing scope(parent) and look there, recursively up to $rootScope

// EXPRESSIONS
// -> all expressions are executed in the context of the scope and have access to local $scope variables
// -> an expression doesn't throw errors if it results in TypeError or ReferenceError
// -> They DO NOT allow any control flow functions(conditionals, eg. if/else)
// -> They can accept a filter and/or filter chains
// -> Angular evaluates expressions by internal service $parse that has knowledge of current scope
// -> to manually parse an expression -> we can inject $parse service into controller and call service
// to do the parsing for us.
// Interpolating a String
// Interpolation allows us to live update a string of text based upon conditions of a scope
// We need to inject $interpolate service in our object
/*
angular.module('myApp', [])
  .controller('MyController',
  function($scope, $interpolate) {

});
 */
// $interpolate service takes up to 3 parameters, with only 1 required
// -> text(string) -> text with markup to interpolate
// -> mustHaveExpression(boolean) -> If we set parameter to true, then text will return null if there is expression
// -> trustedContext (string) - Angular sends result of the interpolation context through the $sce.getTrusted() method
// which provides strict contextual escaping.
// -> it is best to use different beginning and ending symbols in our text ; modify by $interpolateProvider
// startSymbol(value) ; endSymbol(value) ;

// FILTERS
// provides a way to format data. Invoked with | symbol ( pipe ) character
// ex. {{ name | uppercase }}
// can also use filters inside JS by using $filter service :
/*
app.controller('DemoController', ['$scope', '$filter',
  function($scope, $filter) {
    $scope.name = $filter('lowercase')('Mike');
 }]);
 */
// to pass argument to a filter in HTML -> pass it with a colon after a filter name
// {{ 123.4567 | number:2 }}
// we can use multiple filters at the same time using two or more pipes

/* Example filters:
// ##currency : {{ 123 | currency }}
// ##date : allows us to format date based on requested style
// {{ today | date: 'medium }}
// {{ today | date: 'short' }}
// ... fullDate, longDate, mediumDate, shortDate, mediumTime, shortTime
// ##Year Formatting:
// Four-digit year : {{ today | date: 'yyyy' }}
// Two-digit padded year: {{ today | date: 'yy' }}
// One-digit year : {{today | date: 'y' }}
// ##Month Formatting:
// Month in year: {{ today | date: 'MMMM' }}
// Short month in year: {{ today | date: 'MMM' }}
// Padded month in year: {{ today | date: 'MM' }}
// Month in year: {{ today | date: 'M' }}
// ##Day formatting:
// Padded day in month: {{ today | date: 'dd' }}
// Day in month: {{ today | date: 'd' }}
// Day in week: {{ today | date: 'EEEE' }}
// Short day in week: {{ today | date: 'EEE' }}
// ##Hour Formatting
// 'HH', 'H', 'hh', 'h'
// Minute: 'mm', 'm'
// Second: 'ss', 's', 'sss'
// String: am/pm formatting: 'MMM d, y' , 4 digitzone offset : 'Z'
*/
// filter -> selects a subset of items from array of items and returns array of items
// we can use client-side searching for filtering-out items from array
// filter takes string, object or function:
// -> string : filter will accept all elements that match against the string. If want elements that NOT match -> prepend !
// -> object : filter will compare objects that have a property name that matches. If want all properties match -> use $ as key
// -> function : filter will run function over each element, all elements that return non-falsy will appear in new array
// {{ ['Ari', 'Lerner', 'Likes', 'To'] | filter: 'e' }} --> ["Lerner", "Likes"]
// $scope.isCapitalized = function(str) { return str[0] == str[0].toUpperCase(); }
// {{ ['Ari', 'lerner', 'likes', 'to'] | filter: isCapitalized }} --> ["Ari"]
// we can also pass second parameter into filter, that will be used to determine if the expected value
// and the actual value should be considered match
// -> true -> strict comparison of the two using angular.equals(expected, actual)
// -> false -> it looks for case-insensitive substring match
// -> function -> it runs function and accepts an element if the result is truthy.

// json filter
// {{ {'name' : 'Ari', 'City': 'San Francisco'} | json }} -> filter will take a JSON and turn it into a string
// limitTo -> creates an array or string that contains only the specified number of elements, either taken from
// beginning or end, depending on whether the value is positive or negative
// {{ San Francisco is very cloudy | limitTo: 3 }} -> first 3 characters
// {{ San Francisco is very cloudy | limitTo: -6 }} -> last 6 characters

// lowercase -> turn entire string into lowercase
// number -> formats number as text. It can take second param(optional) that will format number to the
// specified number of decimal places(rounded)
// orderBy -> orders the specific array using an expression
// orderBy takes 2 parameters: 1. predicate used to determine order, 2. sort order (optional)
// -> predicate can be : a) function (used as the getter)
// b) string -> will be parsed and result be used as key by which to order elements
// c) array -> it will use elements as predicates in the sort expression
// uppercase -> uppercase the entire string
// Making own filter:
/* \
angular.module('myApp.filters', [])
  .filter('capitalize', function() {
    return function(input) {
      // input will be the string we put in
      if(input)
        return input[0].toUpperCase() + input.slice(1);
    }
  });
*/

// FORM VALIDATION
// Many form validation directives in AngularJS.
/*
<form name="form" novalidate>
  <label name="email">Your email</label>
  <input type="email" name="email" ng-model="email" placeholder="Email Address" />
</form>
*/
// to use form validation -> first ensure that form has a name associated with it
// all input fields can validate against some basic validations -> min length, max length etc.
// good idea -> novalidate -> prevents browser from natively validating form
// required -> <input type="text" required />
// ng-minlength=5 ng-maxlength=20 ng-pattern="/a-zA-Z/"
// email -> type="email"
// number -> type="number"
// url -> type="url"
// Control variables in Forms
// ex. formName.inputFieldName.property :
// $pristine -> unmodified form
// $dirty    -> modified form
// $valid    -> valid From
// $invalid  -> invalid form
// Errors : $error object -> contains all validations on a particular form and record whether they are valid
// formName.inputFieldName.$error
// styling: angular adds classes based on current state
// .ng-pristine .ng-dirty .ng-valid .ng-invalid








