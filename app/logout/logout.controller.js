app.controller(
    'LogoutController',
    [
        'AuthService', '$location',
        function (authService, $location) {
            
            // perform logout
            authService.logout();
            
            // redirect to login
            $location.path('/login');
            
        }
    ]
);