export default function listController(HomeService, AuthService, initialData, $location) {
  if (initialData.user.user === null) {
    $location.path('/login')
  }

  this.lists = initialData.lists.data.lists;

  this.searchText = '';
  this.test = false;
  this.selectedItem = null;
  this.searchResults = [];
  this.cache = true;

  this.facebookLogin = () => {
    HomeService.facebookLogin();
  }

  this.changeSuccess = (res) => {
    return res.data;
  }

  this.changeFail = (err) => {
    return [];
  }

  this.foodAddSuccess = (res) => {
    console.log(res);
  }

  this.foodAddFail = (err) => {
    console.log(err);
  }

  this.listAddSuccess = (res) => {
    console.log(res);
  }

  this.listAddFail = (err) => {
    console.log(err);
  }

  this.addList = () => {
    return HomeService.addList()
      .then(this.listAddSuccess, this.listAddFail)
  }

  this.selectedItemChange = (item) => {
    return HomeService.postFoodItem(item)
      .then(this.foodAddSuccess, this.foodAddFail);
  }

  this.querySearch = (query) => {
    if (query === '') { return []; }
    return HomeService.getFoodOptions(query)
      .then(this.changeSuccess, this.changeFail);
  }
}

