app.controller('BlogController', [
  '$scope',
  'AuthService',
  '$localStorage',
  function($scope, authService, $localStorage) {
    var data = {
      posts: [
        {
          contents: 'Iron Man beat Captin america!',
          author: 'mike',
          createdAt: new Date(),
        },
        {
          contents: 'wait!',
          author: 'jeremy',
          createdAt: new Date(),
        },
      ],
    };

    // if data exists in localstorage, use it
    if ($localStorage.blogData && $localStorage.blogData.posts) {
      // share data with the View
      $scope.data = $localStorage.blogData;

      // otherwise, use the default data
    } else {
      $scope.data = data;
      $localStorage.blogData = $scope.data;
    }

    $scope.postData = {
      contents: '',
    };

    // starting point
    $scope.searchQuery = '';
    $scope.searchResults = $scope.data.posts;

    // watch the topics - if they change (when adding a new topic), then re-run the $scope.filterResults() method, just in case the searchQuery already contains some text
    // more information can be found here:
    //  https://docs.angularjs.org/api/ng/type/$rootScope.Scope#$watchCollection
    $scope.$watchCollection(
      'data.posts', // referring to $scope.data.topics (yes, pass the name of the variable attached to $scope as a string, you may use dots to watch object properties, like 'topics')
      function(newData, oldData) { 
        // newData contains the new topics array, oldData contains the old topicsArray (not needed here, but they may be used)
        // console.log(newData, oldData);
        $scope.filterResults();
      }
    );

    $scope.filterResults = function() {

    
      $scope.searchResults = $scope.data.posts.filter(function(post) {

        // ensure the searchQuery exists and is valid
        if (!$scope.searchQuery) {
          return true;
        }

        // search topic title
        if (
          post.contents
            .toLowerCase()
            .indexOf($scope.searchQuery.toLowerCase()) > -1
        ) {
          // we can stop looking, we know we're going to show it
          return true;
        }

        // search the post author
        if (
          post.author
            .toLowerCase()
            .indexOf($scope.searchQuery.toLowerCase()) > -1
        ) {
          // we can stop looking, we know we're going to show it
          return true;
        }

        // don't show the topic
        return false;
      });
    };
  },
]);
