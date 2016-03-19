export default function listController(HomeService, AuthService, $location, $routeParams, initialData) {//eslint-disable-line
  const homeData = HomeService.getState();

  if (!homeData.selectedlist) {
    HomeService.setList($routeParams.id);
  }

  this.lists = homeData.lists;
  this.current = homeData.selectedList ||
                 this.lists.filter(list => list.id === parseInt($routeParams.id, 10))[0];

  this.searchResults = [];
  this.cache = true;
  this.lists = initialData.lists;

  this.searchText = '';
  this.listName = '';


  this.deleteList = (id) => HomeService.deleteList(id)
    .then(() => {
      this.lists = this.lists.filter(list => list.id !== id);
    });

  this.deleteFood = (id) => HomeService.deleteFood(id)
    .then(() => {
      this.current.relations.foods = this.current.relations.foods.filter(food => food.id !== id);
    });

  this.selectedItemChange = (item) => HomeService.postFoodItem(item.id, this.current.id)
    .then((foods) => {
      this.current.relations.foods = foods;
    });

  this.updateList = (id) => HomeService.updateList(id)
    .then(() => {
      this.current.relations.foods = this.current.relations.foods.filter(food => food.id !== id);
    });

  this.querySearch = (query) => {
    if (query === '') { return []; }

    return HomeService.getFoodOptions(query)
      .then((food) => food.data);
  };
}

