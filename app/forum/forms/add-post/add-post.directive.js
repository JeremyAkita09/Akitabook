app.directive('forumAddPost', [
  '$localStorage', 'AuthService', // injections
  function($localStorage, authService) {

    var directive = {};

    directive.templateUrl = 'app/forum/forms/add-post/add-post.view.html';

    directive.scope = {
      topic: '=',
      data: '=', // treat the post value as an object; available options: @ (simple values), = (objects), & (functions)
    };

    // will be available in the fourth parameter of the link function
    // import controllers from other directives
    // directive.require = [];

    // directive.link = function(scope, element, attrs, ctrl) {
      // runs after the directive view has finished initialising
    // };

    // you may define a controller for this directive - works like a page controller
    directive.controller = function ($scope, $element, $attrs) {
      
      $scope.postData = {
        contents: '',
      };

      // this will execute when the directive has loaded its View into the browser window
      $scope.AddPost = function () {

        var contents = $scope.postData.contents;
        var author = authService.currentUser.firstname + " " + authService.currentUser.surename;
        var date = new Date();

        var post = {
          contents: contents,
          author: author,
          createdAt: date
        };

        $scope.topic.posts.push(post);

        $localStorage.forumData = $scope.data;

        // reset form state
        $scope.postData.contents = '';
        $scope.forum.$setPristine();

      }

    };

    return directive;
  },
]);
