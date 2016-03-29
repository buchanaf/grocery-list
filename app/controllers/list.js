export default function listController(ListService, AuthService, $location, $routeParams, initialData, $scope) {//eslint-disable-line
  const listData = ListService.getState();

  if (!listData.selectedlist) {
    ListService.setList($routeParams.id);
  }

  this.lists = listData.lists;
  this.current = listData.selectedList ||
                 this.lists.filter(list => list.id === parseInt($routeParams.id, 10))[0];

  this.foods = this.current.relations.foods;

  this.searchResults = [];
  this.cache = true;
  this.lists = initialData.lists;

  this.searchText = '';
  this.listName = '';


  this.onCompletionChange = (index) => {
    ListService.updateFoodRelations(this.foods[index]);
  };

  this.deleteFood = (id) => ListService.updateList(id)
    .then(() => {
      this.current.relations.foods = this.current.relations.foods.filter(food => food.id !== id);
    });

  this.addFoodItem = (id) => ListService.postFoodItem(id, this.current.id)
    .then((foods) => {
      this.current.relations.foods = foods;
      this.foods = foods;
      this.searchResults = [];
      this.searchText = '';
    });

  this.querySearch = (query) => {
    if (query === '') { return []; }

    return ListService.getFoodOptions(query)
      .then((foods) => {
        this.searchResults = foods.data;
      });
  };
}
