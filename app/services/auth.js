export default function authService($interval, $log, $http) {
  var user = null;

  this.getCurrentUser = function(query) {
    return $http.get('/api/user')
      .then(function(res){
        user = res.data;
        return user;
      })
      .catch(function(err){
        return err;
      });
  }

  this.returnUser = function() {
    return user;
  }

  return this;
}
