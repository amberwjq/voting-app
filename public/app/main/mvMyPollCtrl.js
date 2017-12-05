angular.module('app').controller('mvMyPollCtrl', function($scope,$http,mvNotifier,$location, $routeParams,$route) {
    console.log("IN MyPoll CONTROLLER");
    var param1 = $routeParams.param1;
    console.log("param1 is   "+param1)
   
    $http.get('/api/mypoll/'+param1).then(function(response){
      console.log("load everytime page reload");
      if(response.data.success){
        $scope.polls=response.data.polls;            
      }
      else {
          mvNotifier.error(response.data.reason)
      }
    })
    
    $scope.delete = function(id){
     console.log("In delete");
     console.log("ID____"+id);
     $http.delete('/api/poll/' + id).then(function(response){
        if(response.data.success){
           
          $scope.polls=response.data.polls; 
          mvNotifier.notify("Delete successfully");
          $location.path('/poll/'+param1);
          $route.reload()
         
        }
        else {
            mvNotifier.error(response.data.reason)
        }
      })

    };

  
  });



  