// app.factory('_',['$window', function($window) {
//   return $window._; 
// }]);
app.controller('dumbshellCtrl', function ($scope, $timeout, $location,$interval) {
    var data = 2;
   $scope.a=true;
    $scope.rollthedie=function(){
         $("#modal-die").modal();
          $scope.counter = 0;
         $scope.opendumbshgells();
         $scope.a=true;
    };     
    var alphabet = 'abc'.split('');
    $scope.Dumbanwsers = [];
    $scope.Totalarray = [];
    for (var i = 0; i <= data; i++) {
        $scope.Totalarray.push({ id: i, Teamname: alphabet[i] });
    }
         $scope.Dumbanwsers.push({ id: 1,Teamname:'a', sentence: ['The Tom and Jerry Show', 'tirumala tirupati devasthanam', 'Sachin hundred hundreds'] });
         $scope.Dumbanwsers.push({ id: 2,Teamname:'b', sentence: ['Whats App Phone calling', 'Hyderbad Biryani with coca', 'The Indian Micheal Jackson'] });
         $scope.Dumbanwsers.push({ id: 3,Teamname:'c', sentence: ['The independence day', 'Pani Puri', 'patient in hospital'] });
    $scope.opendumbshgells = function () {
        $scope.Nowplaying = "";
        $scope.dieimage = "images/die.gif";
        $timeout(function () {
            $scope.dieimage = "images/dieempty.jpg";
            $scope.Nowplaying = _.sample($scope.Totalarray).Teamname;
            $scope.data = _.where($scope.Dumbanwsers,{Teamname:$scope.Nowplaying});
        }, 2500);

    };
    $scope.counter = 0;
    $scope.stopped = false;
    $scope.buttonText='Stop';
    var mytimeout;
    $scope.onTimeout = function(){
        $scope.counter++;
        mytimeout = $timeout($scope.onTimeout,1000);
    };
    $scope.updateList=function(){
          $scope.takeAction();
          console.log(_.where($scope.Dumbanwsers,{Teamname:$scope.Nowplaying})[0]);
          console.log($scope.Nowplaying);
          var index =$scope.Dumbanwsers.indexOf(_.where($scope.Dumbanwsers,{Teamname:$scope.Nowplaying})[0]);
          console.log(index);
          $scope.Dumbanwsers[index].TotalTime=$scope.counter;
          localStorage.setItem('Dumbanwsers',$scope.Dumbanwsers);
            $("#modal-timer").modal('hide');
    };
    $scope.showtimerpopup=function(){
        $("#modal-die").modal('hide');
        $("#modal-timer").modal();
    };
    $scope.starttimer=function(){
        mytimeout = $timeout($scope.onTimeout,1000);
    };
    $scope.takeAction = function(){
        if(!$scope.stopped){
            $timeout.cancel(mytimeout);
            $scope.buttonText='Resume';
        }
        else
        {
            mytimeout = $timeout($scope.onTimeout,1000);
            $scope.buttonText='Stop';
        }
            $scope.stopped=!$scope.stopped;
    }; 
    $scope.resettimer=function(){
       $scope.counter=0;
       $scope.buttonText='Stop'; 
    };
    $scope.opendumbshgells();
    $scope.redirect = function () {
        $location.path('/');
    };
});
app.filter('formatTimer', function() {
  return function(input)
    {
        function z(n) {return (n<10? '0' : '') + n;}
        var seconds = input % 60;
        var minutes = Math.floor(input / 60);
        var hours = Math.floor(minutes / 60);
        return (z(hours) +':'+z(minutes)+':'+z(seconds));
    };
});
