angular.module('models', []).service('User', function($location, $http) {
  var _user = {};

  return {
    getToken: function() {
      return sessionStorage.getItem('token');
    },
    setToken: function(token) {
      sessionStorage.setItem('token', token);
    },
    getInfo: function() {
      var request = {
        method: 'GET',
        url: '/api/user',
        headers: {
          'token': this.getToken()
        }
      };

      return $http(request);

    },
    loginUser: function(email, password) {
        var request = {
            method: 'POST',
            url: '/api/login',
            data: {
                'email': email,
                'password': password
            }
        };

        return $http(request);
    },
    createUser: function(email, username, password, password_confirmation, secret_code) {
        var request = {
                method: 'POST',
                url: '/api/user',
                data: {
                    'email': email,
                    'username': username,
                    'password': password,
                    'password_confirmation': password_confirmation,
                    'secret_code': secret_code
                }
            };

        return $http(request);
    },
    setUser: function(email, username) {
      this._user = {
        email: email,
        username: username
      };
      sessionStorage.setItem('email', this._user.email);
      sessionStorage.setItem('username', this._user.username);
    },
    getUser: function() {
      return {
              email:  sessionStorage.getItem('email'),
              username: sessionStorage.getItem('username')
            };
    },
    destroyUser: function() {
      this._user = {};
      sessionStorage.clear();
      $location.url('/');
    }

  };
});