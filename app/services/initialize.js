export default function initializeService(AuthService, HomeService) {
  return () => Promise.all([
    AuthService.getCurrentUser(),
    HomeService.getUserLists(),
  ])
  .then((results) => ({
    user: results[0],
    lists: results[1].map(list => ({
      ...list,
      formatDate: HomeService.formatDate(list.attributes.updated_at),
    })),
  }))
  .catch((err) => {
    console.log(err);
  });
}
