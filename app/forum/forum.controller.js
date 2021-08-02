app.controller(
  'ForumController', [
    '$scope', 'AuthService', '$localStorage',
    function($scope, authService, $localStorage) {
      
      var data = {
        topics: [
          {
            title: 'Arsenal',
            posts: [
              {
                contents: 'Torrria is the one!',
                author: 'jeremy',
                createdAt: new Date(),
              },
              {
                contents: 'Lies!',
                author: 'mike',
                createdAt: new Date(),
              }
            ]
          },
          {
            title: 'Man utd',
            posts: [
              {
                contents: 'Jose Marihno needs to get out',
                author: 'manutdfan1990',
                createdAt: new Date(),
              },
              {
                contents: 'Arsemal Play better then us and we play like stoke',
                author: 'alexfergie',
                createdAt: new Date(),
              }
            ]
          }
        ]
      };

      if ($localStorage.forumData) {

        // share data with the View
        $scope.data = $localStorage.forumData;

      } else {

        $scope.data = data;
        $localStorage.forumData = $scope.data;

      }

      $scope.postData = {
        contents: ''
      };

      $scope.forumView = 'topics';

      $scope.TopicMakeActive = function (topic)
      {
        //console.log("Hello");
        $scope.activeTopic = topic;

        $scope.forumView = 'posts';

      }

      $scope.BackToTopics = function () {

        $scope.forumView = 'topics';

      }

    }
  ]
);



















