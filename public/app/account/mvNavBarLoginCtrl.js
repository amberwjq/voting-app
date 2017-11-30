angular.module('app').controller('mvNavBarLoginCtrl',function($scope,$http,mvNotifier,mvIdentity,$location){
    $scope.identity = mvIdentity;
    $scope.signin=function(username,password){
        $http.post('/login',{username:username,password:password}).then(function(response){
            if(response.data.success){
                mvIdentity.currentUser=response.data.user;
               
                mvNotifier.notify('You have successfully logged in');
                // $location.path('/');
                console.log(mvIdentity.currentUser);
                $location.path('/poll');
                // $window.location.href = '/'
            }
            else {
                mvNotifier.notify('Invalid username/password')
            }
        })
      
    }
    $scope.signout=function(){
        $http.post('/logout',{logout:true}).then(function(){
            mvIdentity.currentUser=undefined;
            $scope.username="";
            $sccope.password="";
            mvNotifier.notify('You have successfully logged out');
            $location.path('/');

        })

    }
})