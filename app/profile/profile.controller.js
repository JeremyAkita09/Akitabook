app.controller(
  'ProfileController', [
    '$scope','AuthService',
    function($scope, authService) {
      
      $scope.userProfileImage = authService.currentUser.avatar;

      $scope.showUserProfileImage = !!$scope.userProfileImage;


      // user profile data object - used in the View
      $scope.userProfile = {
        username: authService.currentUser.username,
        firstname: authService.currentUser.firstname,
        surename: authService.currentUser.surename,
        cityname: authService.currentUser.cityname,
        password: authService.currentUser.password,
      }
      
      var ImgToUpload;
      
      $scope.Update = function() {

        // ask the auth service to update the user's profile
        // it will update both the currentUser object and the users array
        authService.updateUserProfile($scope.userProfile);

        $scope.SetProfileImage(ImgToUpload);

        // notify the user
        alert("Updated successfully!");

      };

       angular.element("#userProfileImageUpload").change(function () {
         ImgToUpload = this.files[0];
       });

       $scope.SetProfileImage = function(imageFile){
         
         if(!imageFile){
           return;
         }

         var imgElement = angular.element("#userProfileImagePreview")[0];

         imgElement.file = imageFile;

         var reader = new FileReader();

         reader.onload = 
          (function(aImg) { 
            return function(e) {
              
             
              var imgSrc = e.target.result;
              
              // assign the above to the src attribute of the img html tag so the browser can display it
              aImg.src = imgSrc;
              
              // tell angular to show the div containing it
              $scope.showUserProfileImage = true;
              
              // finally, save the preference for later
              // save it for later
		          //ProfileService.SavePreference("userProfileImage", imgSrc);
		          authService.updateUserProfile({
                avatar: imgSrc
              });

		          // tell angular to refresh the UI to reflect changes
		          $scope.$apply();
		          
            };
          })(imgElement);
          
        // load the file => once ready, it will run the above function attached to 'reader.onload'
       reader.readAsDataURL(imageFile);
		    
		  };

    }
  ]
);