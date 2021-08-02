// app.run() functions similarly to config, but it will execute once 
// all resources (controllers, services, etc.) have been loaded
app.run(
    [
        'AuthService',
        function(authService) {
            
            // get the users from storage first
            authService.getUsersFromStorage();

            // react to route changes to check and enforce user access rules
            authService.setupLocationChangeDetection();

        }
    ]
);
