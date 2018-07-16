# AngularJS

::: warning
This is referring to AngularJS 1.x
:::

## Setting ng-model with object-type value for ng-options

With an object, it can be tricky to preselect a default value unless `track by` is used:

```js
// in controller
$scope.countries = [
  {id: '1', name: 'Malaysia'},
  {id: '2', name: 'Singapore'}
]
$scope.selectedCountry = null

$http.get('/countries/mine').then((country) => {
  $scope.selectedCountry = country
})
```

```html
<!-- in template -->
<select ng-model="selectedCountry" ng-options="c as c.name for c in countries track by c.id"></select>
```

## ng-include is not allowed on elements with ng-switch-when or ng-switch-default

```html
<!-- Error: [$compile:multidir] Multiple directives [ngSwitchDefault, ngInclude] asking for transclusion -->
<div ng-switch-default ng-include='"some/template.html"'></div>
```

It must be:

```html
<div ng-switch-default>
  <div ng-include='"some/template.html"'></div>
</div>
```

## How ng-annotate makes life easier for minification

For [Dependency Injection](https://code.angularjs.org/1.5.7/docs/guide/di) to work properly after minification, we must annotate a controller's dependencies in an extremely tedious way:

```js
angular.module('my_page', [])
.controller('MyPageCtrl', [
  '$scope', '$rootScope', '$location', '$window', '$timeout', 'myService', 'yourService', 'anyService',
  function($scope, $rootScope, $location, $window, $timeout, myService, yourService, anyService) {
    $scope.myName = 'John Cena'
  }
])
```

With [ng-annotate](https://github.com/olov/ng-annotate) and its integration with [various build tools](https://github.com/olov/ng-annotate#tools-support):

```js
angular.module('my_page', [])
.controller('MyPageCtrl',
  function($scope, $rootScope, $location, $window, $timeout, myService, yourService, anyService) {
    $scope.myName = 'John Cena'
  }
)
```

## Custom form validator with NgModelController

*Use case*: a number input field that ensures that user enters a value greater than 0.00

A combination of HTML5 `number` input's `min` and `step` would work, but it's [not compatible everywhere](https://stackoverflow.com/questions/19011861/is-there-a-float-input-type-in-html5).

For AngularJS, we can create a custom directive for [ng-message](https://code.angularjs.org/1.5.11/docs/api/ngMessages/directive/ngMessage):

```js
angular.module('greaterThan', [])
.directive('greaterThan', function() {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function link(scope, el, attrs, ngModel) {
      ngModel.$validators.greaterThan = function(modelValue, viewValue) {
        const value = Number(modelValue || viewValue)
        const minValue = Number(attrs.greaterThan)

        return !isNaN(value) && !isNaN(minValue) ? value > minValue : true
      }
    }
  }
})
```

Use it like:

```html
<form name='myForm' novalidate>
  <input type='number' greater-than='0' name='price'>
  <div ng-messages='myForm.price.$error'>
    <div ng-message='greaterThan'>The price must be greater than 0</div>
  </div>
</form>
```
