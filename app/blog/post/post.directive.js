app.directive('blogPost', [
  'AuthService', // injections
  function(authService) {
    var directive = {};

    directive.templateUrl = 'app/blog/post/post.view.html';

    directive.scope = {
      post: '=', // treat the post value as an object; available options: @ (simple values), = (objects), & (functions)
      data: '=',
    };

   
    directive.controller = function($scope, $element, $attrs) {

      $scope.DeletePost = function() {

        // replace the posts array of the current topic with a new version that won't contain the current post
        $scope.data.posts = $scope.data.posts.filter(function(post) {

          return JSON.stringify(post) !== JSON.stringify($scope.post);
          
        });

      };

      // get the current user's author information to use in the directive's view
      $scope.currentAuthor = authService.currentUser;
      

    };

    return directive;
  },
]);
