angular.module('app').controller('mvSignupCtrl', function($scope, mvNotifier, $location,$http,mvIdentity) {

      $scope.signup = function() {
        if ($scope.password != $scope.repeat) 
        {
            mvNotifier.notify('两次输入的口令不一致');
            return null
        }
        var newUserData = {
          "username": $scope.username,
          "password": $scope.password,
          "firstName": $scope.fname,
          "lastName": $scope.lname
        };
        
        $http.post('/api/signup',newUserData).then(function(response){
          if(response.data.success){
              mvIdentity.currentUser=response.data.user;
             
              mvNotifier.notify('User account created!');
              $location.path('/poll');

          }
          else {
              mvNotifier.error(response.data.reason)
          }
      })

      }
    })