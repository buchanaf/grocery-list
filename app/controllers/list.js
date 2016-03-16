export default function listController(HomeService, AuthService, $location, $routeParams, initialData) {//eslint-disable-line
  if (!initialData) { $location.path('/login'); }

  if (initialData.user.user === null) {
    $location.path('/login');
  }

  const homeData = HomeService.getState();
  this.lists = homeData.lists;
  this.current = homeData.selectedList ||
                 this.lists.filter(list => list.id === parseInt($routeParams.id, 10))[0];

  this.searchResults = [];
  this.cache = true;
  this.lists = initialData.lists;

  this.searchText = '';
  this.listName = '';

  this.addList = () => HomeService.addList(this.listName)
    .then((results) => {
      this.lists.push(results.data.data.list);
    });

  this.deleteList = (id) => HomeService.deleteList(id)
    .then(() => {
      this.lists = this.lists.filter(list => list.id !== id);
    });

  this.deleteFood = (id) => HomeService.deleteFood(id)
    .then(() => {
      this.selectedList = this.selectedlist.foodsfilter(food => food.id !== id);
    });

  this.selectedItemChange = (item) => HomeService.postFoodItem(item);

  this.updateList = (id) => HomeService.updateList(id);

  this.querySearch = (query) => {
    if (query === '') { return []; }

    return HomeService.getFoodOptions(query)
      .then(this.changeSuccess, this.changeFail);
  };
}

