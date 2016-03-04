angular.module('lhkapp', [
  'ngRoute',
  'ngAnimate',
  'ui.bootstrap',
  'ngFileUpload',
  'controllers',
  'services',
  'models'
])
  .config(['$routeProvider',
    function($routeProvider) {

      $routeProvider
        .when('/', {
          templateUrl: 'views/login.html',
          controller: 'loginCtrl'
        })
        .when('/hub', {
          templateUrl: 'views/hub.html',
          controller: 'hubCtrl'
        })
        .when('/posts', {
          templateUrl: 'views/posts.html',
          controller: 'postsCtrl'
        })
        .otherwise({
          redirectTo: '/'
        });
    }
  ]);