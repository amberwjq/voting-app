angular.module('app').controller('mvPollCtrl', function($scope,$http,mvNotifier,$location, $routeParams) {
    console.log("IN Poll CONTROLLER");
    var param1 = $routeParams.param1;
    console.log("param1 is   "+param1)
   
    $http.get('/api/poll/'+param1).then(function(response){
      console.log("load everytime page reload");
      if(response.data.success){
          console.log("Response   "+response.data.poll.options)
        $scope.poll=response.data.poll;  
        $scope.options =response.data.poll.options  ;  
        var w = 300;
        var h = 120;
        var padding = 2;
        
                            // var dataArray = $scope.options;
                             console.log("scope options "+$scope.options );
                            var options=$scope.options;
                            var dataArray=[];
                            console.log("data Array "+options[0].voted );
                            for(var i=0;i<options.length;i++){
                              dataArray.push(options[i].voted)
                            }
                            console.log("data Array "+dataArray);
                            var svg = d3.select("#chart").append("svg")
                                      .attr("height",h)
                                      .attr("width",w);
                            
                            svg.selectAll("rect")
                                .data(dataArray)
                                .enter().append("rect")
                                      .attr("height", function(d, i) {return (d * 4)})
                                      .attr("width",w / dataArray.length - padding,)
                                      .attr("x", function(d, i) {return i * (w / dataArray.length)})
                                      .attr("y", function(d, i) {return h - (d*4)});
                            svg.selectAll("text")
                                .data(dataArray)
                                .enter().append("text")
                                .text(function(d) {return d;}); 
      }
      else {
          mvNotifier.error(response.data.reason)
      }
    })
    
    $scope.vote = function(){
      var Indata = {'product': $scope.poll, 'product2': $scope.selectedName };
      $http.post('/api/updatepoll',Indata).then(function(response){
        if(response.data.success){
           
          $scope.poll=response.data.poll;
          $scope.options =response.data.poll.options;  
          mvNotifier.notify("Voted successfully");
          $location.path('/details/'+param1);
         
        }
        else {
            mvNotifier.error(response.data.reason)
        }
      })

    }
  
  });



  