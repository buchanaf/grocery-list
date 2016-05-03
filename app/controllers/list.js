export default function listController(ListService, AuthService, $location,
                                       $routeParams, initialData, $scope,
                                       ngDialog) {
  const listData = ListService.getState();
  if (!listData.selectedlist) {
    ListService.setList($routeParams.id);
  }

  this.lists = listData.lists;
  this.current = listData.selectedList ||
                 this.lists.filter(list => list.id === parseInt($routeParams.id, 10))[0];

  this.foods = this.current.relations.foods;
  this.friendShow = false;
  this.searchShow = false;

  this.lists = initialData.lists;
  this.foodModal = null;

  this.listName = '';

  this.filterCompleted = (food) => food._pivot_complete;

  this.toggleFriendSearch = () => {//eslint-disable-line
    this.searchShow = false;
    this.friendShow = !this.friendShow;//eslint-disable-line
  };

  this.toggleSearch = () => {
    this.friendShow = false;
    this.searchShow = !this.searchShow;
  };

  this.onCompletionChange = (index, $event) => {
    $event.stopPropagation();
    ListService.updateFoodRelations(this.foods[index]);
  };

  this.deleteFood = (id) => ListService.updateList(id)
    .then(() => {
      this.current.relations.foods = this.current.relations.foods.filter(food => food.id !== id);
    });

  this.openDataModal = (food) => {
    this.foodModal = food;
    ngDialog.open({ template: 'food-meta.html', className: 'ngdialog-theme-default' });
  };
}
