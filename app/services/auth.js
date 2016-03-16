export default function authService($interval, $log, $http) {
  let user = null;

  this.getCurrentUser = () => $http.get('/api/user')
    .then((res) => {
      user = res.data;
      return user;
    })
    .catch(err => err);

  this.returnUser = () => user;

  return this;
}
