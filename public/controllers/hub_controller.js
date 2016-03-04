angular.module('controllers').controller('hubCtrl', ['$scope', '$http', '$location', 'User', 'Page', 'Post',
  function($scope, $http, $location, User, Page, Post) {
    function init() {
      Page.setTitle('HUB');

      User.getInfo().then(
        function(response) {
          $scope.user = response.data;
          getPosts(0);
        },
        function(httpError) {
          $location.url('/');
          console.log(httpError.status + ": " + httpError.statusText);
        });
    }

    function getPosts(page) {
      Post.getPosts(page).then(
        function(response) {
          $scope.posts = response.data;
        },
        function(httpError) {
          console.log(httpError.status + ": " + httpError.statusText);
        });
    }

    init();
  }
]);