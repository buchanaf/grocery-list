export default function homeController(HomeService, AuthService, initialData, $location) {
  if (initialData.user.user === null) {
    $location.path('/login');
  }

  this.selectedItem = null;
  this.searchResults = [];
  this.cache = true;
  this.lists = initialData.lists

  this.searchText = '';
  this.listName = '';

  this.facebookLogin = () => {
    HomeService.facebookLogin();
  }

  this.changeSuccess = (res) => {
    return res.data;
  }

  this.changeFail = (err) => {
    return [];
  }

  this.addList = () => {
    return HomeService.addList(this.listName)
      .then((results) => {
        console.log(results);
        this.lists.push(results.data.data.list);
      });
  }

  this.listAddSuccess = (res) => {
    console.log(res);
  }

  this.listAddFail = (err) => {
    console.log(err);
  }

  this.deleteList = (id) => {
    return HomeService.deleteList(id)
      .then(() => {
        this.lists = this.lists.filter(list => list.id !== id);
      });
  }

  this.selectedItemChange = (item) => {
    return HomeService.postFoodItem(item)
      .then(this.foodAddSuccess, this.foodAddFail);
  }

  this.foodAddSuccess = (res) => {
    console.log(res);
  }

  this.foodAddFail = (err) => {
    console.log(err);
  }

  this.querySearch = (query) => {
    if (query === '') { return []; }
    return HomeService.getFoodOptions(query)
      .then(this.changeSuccess, this.changeFail);
  }
}

