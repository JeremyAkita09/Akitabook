app.controller(
  'NavigationController', [
    '$scope', 'AuthService',
    function($scope, authService ,$location) {
      
      $scope.$location = $location;

      $scope.menuItems = [{
        title: 'Dashboard',
        link: '/dashboard',
        requiresPrivateAccess: true,
      }, {
        title: 'Profile',
        link: '/profile',
        requiresPrivateAccess: true,
      }, {
        title: 'Login',
        link: '/login',
        requiresPublicAccess: true,
      }, {
        title: 'Logout',
        link: '/logout',
        requiresPrivateAccess: true,
      }, {
        title: 'Register',
        link: '/register',
        requiresPublicAccess: true,
      },{
        title: 'Forum',
        link: '/forum',
        requiresPrivateAccess: true,
      },{
        title: 'Blog',
        link: '/blog',
        requiresPrivateAccess: true,
      },{
        title: 'About Us',
        link: '/about-us',
        requiresPublicAccess: true,
      }, ];

      // check if user is logged in
      var userIsLoggedIn = function() {
        // if currentUser is null, then they are logged in, thus returning TRUE
        return authService.currentUser !== null;
      }

      $scope.isMenuItemVisible = function(item) {
        if (item.requiresPublicAccess && !userIsLoggedIn()) {
          // all OK here
          return true;
        }
        if (item.requiresPrivateAccess && userIsLoggedIn()) {
          // all OK here
          return true;
        }
        return false;
      }

    }
  ]
);