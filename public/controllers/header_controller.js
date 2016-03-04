angular.module('controllers', []).controller('headerCtrl', ['$scope', 'Page', 'User',
  function($scope, Page, User) {
    function init() {
      $scope.title = Page.title();
    }

    $scope.logout = function() {
      User.destroyUser();
    };

    init();
  }
]);