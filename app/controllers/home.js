export default function homeController(HomeService, AuthService, initialData) {
  // if (!initialData) { $location.path('/login'); }

  // if (initialData.user.user === null) {
  //   $location.path('/login');
  // }
  console.log(initialData);
  this.selectedItem = null;
  this.searchResults = [];
  this.cache = true;
  this.lists = initialData.lists;

  this.searchText = '';
  this.listName = '';

  this.facebookLogin = () => {
    HomeService.facebookLogin();
  };

  this.changeSuccess = (res) => res.data;

  this.changeFail = (err) => err;

  this.addList = () => HomeService.addList(this.listName)
    .then((results) => {
      this.lists.push(results.data.data.list);
    });

  this.listAddSuccess = (res) => res;

  this.listAddFail = (err) => err;

  this.deleteList = (id) => HomeService.deleteList(id)
    .then(() => {
      this.lists = this.lists.filter(list => list.id !== id);
    });

  this.selectedItemChange = (item) => HomeService.postFoodItem(item)
    .then(this.foodAddSuccess, this.foodAddFail);

  this.setSelectedList = (listIndex) => HomeService.setSelectedList(listIndex);

  this.foodAddSuccess = (res) => res;

  this.foodAddFail = (err) => err;

  this.querySearch = (query) => {
    if (query === '') { return []; }

    return HomeService.getFoodOptions(query)
      .then(this.changeSuccess, this.changeFail);
  };
}

