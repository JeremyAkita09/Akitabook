app.controller(
    'LoginController',
    [
        '$scope', 'AuthService', '$location',
        function ($scope, authService, $location) 
        {
            
            // as soon as the page loads, check if the user is logged in
            
            // run the user credentials through the auth service
            $scope.ProcessLogin = function () {
                
                try {
                    
                    // see if it triggers the Error...
                    authService.checkUser($scope.username, $scope.password);
                    
                    // all OK, carry on, redirect the user to their dashboard
                    $location.path('/dashboard');
                    
                } catch (e) {
                    
                    // log error for further investigation
                    console.log('LoginController/ProcessLogin: Error - ', e);
                    
                    // damn, wrong credentials!
                    alert('Wrong credentials! Please try again.');
                    
                }
                
            }
            
            // fetch users from storage - for development purposes
            $scope.GetUsers = function() {
                return authService.getUsers();
            }
            
        }
    ]
);