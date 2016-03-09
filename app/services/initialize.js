export default function initializeService(AuthService, HomeService) {
  return function() {
    return Promise.all([
      AuthService.getCurrentUser(),
      HomeService.getUserLists(),
    ])
    .then(function(results) {
      return {
        user: results[0],
        lists: results[1],
      };
    })
    .catch(function(err){
      console.log(err);
    });
  }
}

