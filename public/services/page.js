angular.module('services', []).service('Page', function() {
  var title = 'default';
   return {
     title: function() { return title; },
     setTitle: function(newTitle) { title = newTitle; }
   };
});