app.controller(
    'RegisterController', [
        '$scope', 'AuthService', '$location',
        function($scope, authService, $location) {

            // create user account
            $scope.ProcessRegistration = function() {

                // check passwords match
                // "123" == 123 => TRUE (does not enforce data types)
                // "123" === 123 => FALSE (enforces data types)
                if ($scope.password !== $scope.passwordRepeat) {

                    // alert the user
                    alert('Passwords don\'t match!');
                    return false;

                }

                // crate user object
                var user = {
                    username: $scope.username,
                    password: $scope.password,
                    firstname: $scope.firstname,
                    surename: $scope.surename,
                    cityname: $scope.cityname
                };

                try {
                    
                    // add user to storage
                    authService.saveUser(user);
                    
                    // all OK, let's send them on to their dashboard
                    $location.path('/dashboard');
                    
                } catch (e) {
                    // if the service triggers an exception, catch it and log the issue
                    console.log('RegistrationController/ProcessRegistration: Exception - ', e);
                }

            };

            // fetch users from storage - for development purposes
            $scope.GetUsers = function() {
                return authService.getUsers();
            }
        }
    ]
);