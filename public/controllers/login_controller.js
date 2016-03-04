angular.module('controllers').controller('loginCtrl', ['$scope', '$http', '$location', 'User', 'Page',
  function($scope, $http, $location, User, Page) {
    function init() {
      Page.setTitle('LOGIN/SIGNUP');

      User.getInfo().then(
        function(response) {
          $location.url('/hub');
        },
        function(httpError) {
          console.log(httpError.status + ": " + httpError.statusText);
        });
    }

    $scope.login = function() {
      User.loginUser($scope.email, $scope.password).then(
        function(response) {
          User.setToken(response.data.token);
          User.getInfo().then(
            function(response) {
              User.setUser(response.data.email, response.data.username);
              $location.url('/hub');
            },
            function(httpError) {
              console.log(httpError.status + ": " + httpError.statusText);
            });
        },
        function(httpError) {
          console.log(httpError.status + ": " + httpError.statusText);
        });
    };

    $scope.signUp = function() {
      User.createUser($scope.newemail, $scope.newusername, $scope.newpassword, $scope.newpassword_conf, $scope.secret).then(
        function(response) {
          User.setToken(response.data.token);
          User.setUser(response.data.user.email, response.data.user.username);
          $location.url('/hub');
        },
        function(httpError) {
          console.log(httpError.status + ": " + httpError.statusText);
        });

    };

    init();
  }
]);