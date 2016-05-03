export default () => ({
  restrict: 'E',
  transclude: true,
  templateUrl: '/app/partials/friend-search.html',
  controller: (ListService) => {
    this.queryFriend = (query) => {
      if (query === '') {
        this.searchResults = [];
        return;
      }

      ListService.addQuery(query);
      if (ListService.getQueryLoading()) {
        return;
      }

      ListService.setQueryLoading(true);

      ListService.getFoodOptions(ListService.popQuery()).then((foods) => {
        ListService.setQueryLoading(false);
        this.searchResults = foods.data;

        if (ListService.queryStack().length) {
          this.querySearch(ListService.popQuery());
        }
      });
    };
  },
});
