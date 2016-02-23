export default function homeService($interval, $log, $http) {
  return {
    getFoodOptions: function(query) {
      return $http.get('/api/food?q=' + query);
    },
    facebookLogin: function(query) {
      return $http.get('/auth/facebook');
    },
    postFoodItem: function(item) {
      return $http.post('/api/food', item);
    },
    addList: function(item) {
      return $http.post('/api/list');
    },
  }
}
