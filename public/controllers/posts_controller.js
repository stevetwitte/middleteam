angular.module('controllers').controller('postsCtrl', ['$scope', '$http', '$location', 'Page', 'User', 'Post', '$uibModal',
  function($scope, $http, $location, Page, User, Post, $uibModal) {
    function init() {
      Page.setTitle('POSTS');
      $scope.page = 0;
      $scope.showNext = true;
      $scope.showPrevious = false;

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
          if ($scope.posts.length === 0) {
            $scope.showNext = false;
          }
        },
        function(httpError) {
          console.log(httpError.status + ": " + httpError.statusText);
        });
    }

    $scope.openPostCreate = function() {
      var createPostInstance = $uibModal.open({
        animation: true,
        templateUrl: 'views/_new_post.html',
        controller: 'createPostInstanceCtrl',
        size: 'lg',
        backdrop: false
      });

      createPostInstance.result.then(function(newPost) {
        $scope.posts.unshift(newPost);
      });
    };

    $scope.nextPage = function() {
      $scope.showPrevious = true;
      $scope.page++;
      getPosts($scope.page);
    };

    $scope.previousPage = function() {
      $scope.showNext = true;
      $scope.page--;
      if ($scope.page <= 0) {
        $scope.showPrevious = false;
      }
      getPosts($scope.page);
    };

    $scope.openPostDetails = function(post) {
      $location.url('/post/' + post.id);
    };

    init();
  }
]).controller('createPostInstanceCtrl', ['$scope', '$uibModalInstance', '$timeout', 'User', 'Upload', 'Post',
  function($scope, $uibModalInstance, $timeout, User, Upload, Post) {

    $scope.createPost = function(file) {
      $scope.submitDisabled = true;
      spinner.spin(document.body);
      Post.createPost($scope.title, $scope.body, file).then(function(response) {
        if (response.status === 200) {
          spinner.stop();
          $uibModalInstance.close(response.data);
        } else {
          spinner.stop();
          console.log(httpError.status + ": " + httpError.statusText);
        }
      });
    };

    $scope.cancelPost = function() {
      $uibModalInstance.dismiss('cancel');
    };
  }
]);