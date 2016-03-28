export default function initializeService(AuthService, ListService) {
  return () => Promise.all([
    AuthService.getCurrentUser(),
    ListService.getUserLists(),
  ])
  .then((results) => ({
    user: results[0],
    lists: results[1].map(list => ({
      ...list,
      formatDate: ListService.formatDate(list.attributes.updated_at),
    })),
  }))
  .catch((err) => {
    console.log(err);
  });
}
