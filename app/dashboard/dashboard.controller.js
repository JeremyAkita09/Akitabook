app.controller(
  'DashboardController', [
    '$scope', 'AuthService',
    function($scope, authService) {

      // controller logic

      // view variable
      $scope.userName = authService.currentUser.username;
      
      //Rss Feed
       


      var someFunction = function() {
        //
      };

      // execute
      someFunction();

      $scope.clock = {
        clock: new Date()
      }
      var updateClock = function() {
        $scope.clock.now = new Date();
      };

      setInterval(function() {
        $scope.$apply(updateClock);
      }, 1000);

      updateClock();
    }



  ]
);