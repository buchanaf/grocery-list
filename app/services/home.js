export default function homeService($interval, $log, $http) {
  var lists = [];

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
    getUserLists: function() {
      return $http.get('/api/list')
    },
  }
}
