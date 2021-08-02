app.service(
  'AuthService', [
    // $rootScope is an application-level scope that allows your 
    // app pages/services/etc. to communicate and react to events
    '$rootScope', '$location', '$localStorage',
    function($rootScope, $location, $localStorage) {

      // save a reference to the Service instance
      var srv = this;

      /**
       * PRIVATE PROPERTIES
       */
      var users = [];
      var protectedPages = [
        '/dashboard',
        '/logout',
        '/profile',
        '/forum',
        '/blog',
      ];

      /**
       * PUBLIC PROPERTIES
       */
      // current user object
      // contains 'null' if logged out, or a user object if logged in
      srv.currentUser = null;

      /**
       * PUBLIC METHODS (attached to 'srv')
       */
      // logout helper
      srv.logout = function() {
        // remove the current user information
        srv.currentUser = null;
        // remove current user from storage
        $localStorage.data.currentUser = null;
      };

      // check user account details and throw an Error if wrong
      srv.checkUser = function(username, password) {

        // maintain a boolean flag
        var foundUser = false;

        // check every user account entry
        for (var i = 0; i < users.length; i++) {

          var user = users[i];

          // verify username and passsword match
          if (user.username === username && user.password === password) {

            // all OK!
            foundUser = true;

            // mark as current user i.e. log them in
            srv.currentUser = user;

            // save to storage for later use
            saveCurrentUserToStorage();

            // stop the loop
            break;

          }

        }

        // break the world!
        if (!foundUser) {
          throw new Error('AuthService/checkUser: Invalid user credentials.');
        }

      };

      // retrieve stored users
      srv.getUsers = function() {
        return users;
      };

      // add user to storage and logs them in if all OK
      srv.saveUser = function(user) {

        // validate user object's properties
        if (!user.password || !user.username) {

          // generate console error with a custom message, thus stopping this method
          throw new Error('AuthService/saveUser: User object is invalid, missing data. Object: ' + JSON.stringify(user));

        }

        // all OK, add user to storage
        users.push(user);

        // login the user
        srv.checkUser(user.username, user.password);

        // save users to storage
        saveUsersToStorage();

      };

      // method to setup access control checks and enforcement
      // called in app/security.config.js
      srv.setupLocationChangeDetection = function() {

        // when the user requests a new page
        $rootScope.$on('$locationChangeStart', function(locationChangeEvent, requestedLocation, currentLocation) {

          // console.log('AuthService/setupLocationChangeDetection/$locationChangeStart: Requested Location - ', requestedLocation); // uncomment to see the value of 'requestedLocation'

          var requestedLocationParts = requestedLocation.split('/'); // this is now an array

          // console.log('AuthService/setupLocationChangeDetection/$locationChangeStart: Requested Route - ', requestedLocationParts); // uncomment to see the contents of 'requestedLocationParts'

          // extract the page location from the requested location
          // it'll be the last item in the array - Array.pop() returns the last element of an array
          // it won't have the preceding forward-slash, so we'll add it for consistency
          var pageToAccess = '/' + requestedLocationParts.pop();

          // console.log('AuthService/setupLocationChangeDetection/$locationChangeStart: Requested Route - ', pageToAccess); // uncomment to see the value of 'pageToAccess'

          // Array.indexOf(element) - returns the index of the element within the array, or returns -1 if it can't find it
          // check if this is not a protected page
          if (protectedPages.indexOf(pageToAccess) === -1) {

            // check if the user is logged in at this time, redirect them to their dashboard
            // a convenience check for the user
            if (srv.currentUser !== null) {

              // redirect user
              $location.path('/dashboard');

              // stop the check, user is authenticated
              return;

            }

            // stop the check, we don't care
            return;

          }

          // we're checking access to a protected page now, so check if the user if logged in
          if (srv.currentUser !== null) {

            // stop the check, user is authenticated
            return;

          }

          // otherwise, user is not authorised, redirect them to login
          $location.path('/login');

        });

      };

      // retrieve persistent storage data
      srv.getUsersFromStorage = function() {

        // if this is the very first time we've accessing storage
        if (!$localStorage.data) {

          // initialise it with an empty array
          $localStorage.data = {
            usersArray: [],
            currentUser: null
          };

        }

        // get users, if any
        users = $localStorage.data.usersArray;

        // get current user, if any
        srv.currentUser = $localStorage.data.currentUser;

      };

      // update user profile
      srv.updateUserProfile = function(profile) {

        // update currentUser by merging the existing currentUser data with the new profile object data
        srv.currentUser = Object.assign({}, srv.currentUser, profile);
        
        // update the user array
        // check every user account entry
        for (var i = 0; i < users.length; i++) {

          // verify username matches
          if (users[i].username === srv.currentUser.username) {
            
            users[i] = srv.currentUser;
            
          }
          
        }

        // save to storage
        saveUsersToStorage();
        saveCurrentUserToStorage();

      };

      /**
       * PRIVATE METHODS
       */

      // save persistent storage data
      var saveUsersToStorage = function() {

        // overwrite previous users array in localStorage
        $localStorage.data.usersArray = users;

      };

      var saveCurrentUserToStorage = function() {
        
        // save to storage for later use
        $localStorage.data.currentUser = srv.currentUser;
        
      };

      /**
       * END OF SERVICE
       */

      // return the service public methods so they may be used by other parts of our app
      return srv;

    }
  ]
);