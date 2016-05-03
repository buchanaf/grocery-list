export default function authService($location, $http) {
  let user = null;

  this.getCurrentUser = () => $http.get('/api/user')
    .then((res) => {
      if (res.data) {
        user = res.data;
      } else {
        $location.path('/login');
      }
      return user;
    })
    .catch(err => err);

  this.returnUser = () => user;

  return this;
}
