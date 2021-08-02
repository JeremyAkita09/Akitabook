app.directive('forumPost', [
  'AuthService', // injections
  function(authService) {
    var directive = {};

    directive.templateUrl = 'app/forum/post/post.view.html';

    directive.scope = {
      post: '=', // treat the post value as an object; available options: @ (simple values), = (objects), & (functions)
      topic: '=',
    };

    // will be available in the fourth parameter of the link function
    // import controllers from other directives
    // directive.require = [];

    // directive.link = function(scope, element, attrs, ctrl) {
    // this will execute when the directive has loaded its View into the browser window
    // };

    // you may define a controller for this directive
    directive.controller = function($scope, $element, $attrs) {

      $scope.DeletePost = function() {

        // replace the posts array of the current topic with a new version that won't contain the current post
        $scope.topic.posts = $scope.topic.posts.filter(function(post) {

          return JSON.stringify(post) !== JSON.stringify($scope.post);
          
        });

      };

      // get the current user's author information to use in the directive's view
      $scope.currentAuthor = authService.currentUser.firstName + ' ' + authService.currentUser.lastName;
      

    };

    return directive;
  },
]);
