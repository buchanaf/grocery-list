export default function initializeService(AuthService) {
  return function() {
    return Promise.all([
      AuthService.getCurrentUser()
    ])
    .then(function(results) {
      return {
        user: results[0],
      };
    })
    .catch(function(err){
      console.log(err);
    });
  }
}

