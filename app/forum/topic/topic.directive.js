app.directive(
  'forumTopic',
  [
    // injections
    function () {

      var directive = {};

      directive.templateUrl = 'app/forum/topic/topic.view.html';

      directive.scope = {
        topic: '=', // treat the post value as an object; available options: @ (simple values), = (objects), & (functions)
        data: '=',
      };

  

      // you may define a controller for this directive
      directive.controller = function($scope, $element, $attrs) {

        $scope.DeleteTopic = function() {

          // replace the topics array with a new version that won't contain the current topic
          $scope.data.topics = $scope.data.topics.filter(function(topic) {

            return JSON.stringify(topic) !== JSON.stringify($scope.topic);

          });

        };

      };

      return directive;

    }
  ]
);