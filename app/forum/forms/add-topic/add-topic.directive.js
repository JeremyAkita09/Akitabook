app.directive('forumAddTopic', [
  '$localStorage', // injections
  function($localStorage) {
    var directive = {};

    directive.templateUrl = 'app/forum/forms/add-topic/add-topic.view.html';

    directive.scope = {
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
      
      $scope.topicData = {
        title: '',
      };

      // this will execute when the directive has loaded its View into the browser window
      $scope.AddTopic = function() {

        var topic = {
          title: $scope.topicData.title,
          posts: [],
        };

        $scope.data.topics.push(topic);

        $localStorage.forumData = $scope.data;

        // reset form state
        $scope.topicData.title = '';
        $scope.forum.$setPristine();

      };

    };

    return directive;
  },
]);
