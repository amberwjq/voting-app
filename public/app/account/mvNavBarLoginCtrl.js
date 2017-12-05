angular.module('app').controller('mvNavBarLoginCtrl',function($scope,$http,mvNotifier,mvIdentity,$location,$cookieStore){
    $scope.identity = mvIdentity;
    $scope.signin=function(username,password){
        $http.post('/login',{username:username,password:password}).then(function(response){
            if(response.data.success){
                $cookieStore.put("currentUser",response.data.user);
                $scope.identity.currentUser=$cookieStore.get("currentUser");
                  console.log("cookie store "+$cookieStore.get("currentUser"));        
                mvNotifier.notify('You have successfully logged in');
                // $location.path('/');
                console.log( $scope.identity.currentUser);
                $location.path('/poll');
                $route.reload()
            }
            else {
                mvNotifier.notify('Invalid username/password')
            }
        })
      
    }
    $scope.signout=function(){
        $http.post('/logout',{logout:true}).then(function(){
            $cookieStore.remove("currentUser");
            $scope.username="";
            $scope.password="";
            $scope.identity.currentUser=undefined;
            mvNotifier.notify('You have successfully logged out');
            $location.path('/');
            $route.reload()

        })

    }
})