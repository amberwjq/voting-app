angular.module('app').controller('mvMainCtrl', function($scope,$http,mvNotifier,$location,mvIdentity,$route) {
  console.log("IN MAIN CONTROLLER");
  $scope.identity = mvIdentity;
  $scope.clickCounter=0;

  $http.get('/api/polls').then(function(response){
    if(response.data.success){
      $scope.polls=response.data.polls;     
    }
    else {
        mvNotifier.error(response.data.reason)
    }
  })
  $scope.createNewPoll = function() {
    var optionArray=[];
   $( ":input" ).each(function(index){
    //$('#formGroupExampleInput2').find('input').each(function(){
      
      if((this.value !="") && (index>0))
      {
        
        optionArray.push({
          name:this.value,
          voted:0
        })
      }
  });
    console.log(optionArray[1]);
    var newpollData = {
      "subject": $scope.subject,
      "options":optionArray
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
  $scope.addOption=function(){
   
    $scope.clickCounter += 1;
    console.log($scope.clickCounter);
    
  }
  $scope.lgtOne= function(number){
    if(number >= 1) return true
    else return false
  }
  $scope.lgtTwo= function(number){
    if(number >= 2) return true
    else return false
  }
  $scope.lgtThree= function(number){
    if(number >= 3) return true
    else return false
  }    

});