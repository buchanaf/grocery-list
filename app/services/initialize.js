export default function initializeService(AuthService, HomeService) {
  return function() {
    return Promise.all([
      AuthService.getCurrentUser(),
      HomeService.getUserLists(),
    ])
    .then(function(results) {
      return {
        user: results[0],
        lists: results[1].data.lists.map((list) => {
          return { ...list, formatDate: HomeService.formatDate(list.updated_at) };
        }),
      };
    })
    .catch(function(err){
      console.log(err);
    });
  }
}

