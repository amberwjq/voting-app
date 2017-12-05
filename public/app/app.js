angular.module('app', ['ngResource', 'ngRoute','ngCookies']);

angular.module('app').config(function($routeProvider, $locationProvider) {
    // $locationProvider.html5Mode(true);
    $routeProvider
    .when('/signup', { templateUrl: '/partials/signup.html',controller:'mvSignupCtrl'})
    .when('/login', { templateUrl: '/partials/login.html',controller:'mvNavBarLoginCtrl'})
     .when('/', { templateUrl: '/partials/main.html', controller: 'mvMainCtrl'})
    .when('/poll', { templateUrl: '/partials/poll.html', controller: 'mvMainCtrl'})
    .when('/newpoll', { templateUrl: '/partials/newpoll.html', controller: 'mvMainCtrl'})
    .when('/details/:param1', { templateUrl: '/partials/polldetails.html', controller: 'mvPollCtrl'})
    .when('/poll/:param1', { templateUrl: '/partials/mypoll.html', controller: 'mvMyPollCtrl'})
    
   
      
});



