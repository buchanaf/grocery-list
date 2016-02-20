export default function homeController(HomeService) {
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