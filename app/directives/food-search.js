export default () => ({
  restrict: 'E',
  transclude: true,
  templateUrl: '/app/partials/food-search.html',
  controllerAs: 'food',
  controller: function foodDirective(ListService, $scope) {
    this.searchResults = [];
    this.searchText = '';

    this.searchLoading = () => ListService.getQueryLoading();

    this.addFoodItem = (id, listId) => ListService.postFoodItem(id, listId)
      .then((foods) => {
        $scope.list.current.relations.foods = foods;//eslint-disable-line
        $scope.list.foods = foods;//eslint-disable-line
        $scope.list.toggleSearch();
        this.searchResults = [];
        this.searchText = '';
      });

    this.querySearch = (query) => {
      if (query === '') {
        this.searchResults = [];
        return;
      }

      ListService.addQuery(query);
      if (ListService.getQueryLoading()) { return; }

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

