window.angular.module('ab.filters', ['ab.filters.pepe'])
  .filter('startFrom', function() {
    return function(input, start) {
      return input.slice(start);
    }
  });


