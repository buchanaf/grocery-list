export default function homeService($interval, $log, $http) {
  return {
    getFoodOptions: function(query) {
      return  $http.get('/api/food?q=' + query);
    }
  }
}
