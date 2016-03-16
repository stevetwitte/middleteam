angular.module('controllers').controller('postDetailsCtrl', ['$scope', '$http', '$location', '$routeParams', 'Page', 'User', 'Post',
  function($scope, $http, $location, $routeParams, Page, User, Post) {
    function init() {
      Page.setTitle('POST TEST');
      console.log($routeParams.id);
    }

    init();

  }
]);