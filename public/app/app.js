angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function($routeProvider, $locationProvider) {
    // $locationProvider.html5Mode(true);
    $routeProvider
    .when('/signup', { templateUrl: '/partials/signup.html',controller:'mvSignupCtrl'})
    .when('/login', { templateUrl: '/partials/login.html',controller:'mvNavBarLoginCtrl'})
    .when('/', { templateUrl: '/partials/main.html', controller: 'mvMainCtrl'})
    .when('/poll', { templateUrl: '/partials/poll.html', controller: 'mvMainCtrl'})
   
      
});



