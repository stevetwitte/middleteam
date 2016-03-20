angular.module('models').service('Post', function($location, $http, User, Upload) {
  var _posts = {};

  return {
    createPost: function(title, body, file) {
      var request = {
        method: 'POST',
        url: '/api/post',
        headers: {
          'token': User.getToken()
        },
        data: {
          title: title,
          body: body,
          file: file
        }
      };

      return Upload.upload(request);
    },

    getPost: function(id) {
      if (id === undefined) {
        return false;
      }

      var request = {
        method: 'GET',
        url: 'api/post/' + id,
        headers: {
          'token': User.getToken()
        }
      };

      return $http(request);
    },

    getPosts: function(page) {
      if (page === undefined) {
        page = 0;
      }

      var request = {
        method: 'GET',
        url: '/api/posts?page=' + page,
        headers: {
          'token': User.getToken()
        }
      };

      return $http(request);
    }
  };
});