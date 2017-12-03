angular.module('app').controller('mvMainCtrl', function($scope,$http,mvNotifier,$location) {
  console.log("IN MAIN CONTROLLER");


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


    console.log(newpollData.subject);
    console.log("creat new poll function");
    $http.post('/api/createpoll',newpollData).then(function(response){
      if(response.data.success){
        mvNotifier.notify('New Poll created!');
        $scope.polls=response.data.polls;     
        $location.path('/poll');
  
      }
      else {
          mvNotifier.error(response.data.reason)
      }
    })
  }

});