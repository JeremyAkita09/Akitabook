app.config(
    [
        '$routeProvider',
        function($routeProvider) {
            $routeProvider
                .when(
                    '/dashboard', {
                        templateUrl: 'app/dashboard/dashboard.view.html',
                        controller: 'DashboardController'
                    }
                )
                .when(
                    '/login', {
                        templateUrl: 'app/login/login.view.html',
                        controller: 'LoginController'
                    }
                )
                .when(
                    '/about-us', {
                        templateUrl: 'app/about-us/about-us.view.html',
                        controller: 'AboutUsController'
                    }
                )
                .when(
                    '/logout', {
                        template: '&nbsp;', // needs a space
                        controller: 'LogoutController'
                    }
                )
                .when(
                    '/register', {
                        templateUrl: 'app/register/register.view.html',
                        controller: 'RegisterController'
                    }
                )
                .when(
                    '/profile', {
                        templateUrl: 'app/profile/profile.view.html',
                        controller: 'ProfileController'
                    }
                )
                .when(
                  '/blog',{
                     templateUrl: 'app/blog/blog.view.html',
                      controller: 'BlogController'
                  }
                  )
                 .when(
                    '/forum', {
                        templateUrl: 'app/forum/forum.view.html',
                        controller: 'ForumController'
                    }
                )
                .otherwise({
                    redirectTo: '/dashboard'
                });
        }
    ]
);
