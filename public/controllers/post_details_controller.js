angular.module('controllers').controller('postDetailsCtrl', ['$scope', '$http', '$location', '$routeParams', 'Page', 'User', 'Post',
  function($scope, $http, $location, $routeParams, Page, User, Post) {
    function init() {
      Page.setTitle('POST TEST');
      User.getInfo().then(
        function(response) {
          $scope.user = response.data;
          spinner.spin(document.body);
          Post.getPost($routeParams.id).then(
            function(response) {
              spinner.stop();
              $scope.post = response.data;
              console.log($scope.post);
            },
            function(httpError) {
              spinner.stop();
              console.log(httpError.status + ": " + httpError.statusText);
            });
        },
        function(httpError) {
          $location.url('/');
          console.log(httpError.status + ": " + httpError.statusText);
        });
    }

    init();

  }
]);