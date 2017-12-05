angular.module('app').controller('mvMainCtrl', function($scope,$http,mvNotifier,$location,mvIdentity) {
  console.log("IN MAIN CONTROLLER");
  $scope.identity = mvIdentity;

  $http.get('/api/polls').then(function(response){
    if(response.data.success){
      $scope.polls=response.data.polls;     
    }
    else {
        mvNotifier.error(response.data.reason)
    }
  })
  $scope.createNewPoll = function() {
    var newpollData = {
      "subject": $scope.subject,
      "options": [{
        name: $scope.option1,
        voted:0
      },
      {
        name: $scope.option2,
        voted:0
      }]
    }; 
    $http.post('/api/createpoll',newpollData).then(function(response){
      if(response.data.success){
        mvNotifier.notify('New Poll created!');
        $scope.polls=response.data.polls;     
        $location.path('/poll');
        $route.reload()
  
      }
      else {
          mvNotifier.error(response.data.reason)
      }
    });
    
  };
  $scope.filterMyPoll=function(){
    console.log("In fileter my poll");
    $http.get('/api/mypoll').then(function(response){
      if(response.data.success){
        $scope.polls=response.data.polls;     
      }
      else {
          mvNotifier.error(response.data.reason)
      }
    })     
  }

});