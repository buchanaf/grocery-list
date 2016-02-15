export default function homeController(HomeService) {
  this.searchText = '';
  this.test = false;
  this.searchResults = [];
  this.cache = true;


  this.changeSuccess = (res) => {
    return res.data;
  }

  this.changeFail = (err) => {
    return [];
  }

  this.querySearch = (query) => {
    if (query === '') { return []; }
    return HomeService.getFoodOptions(query)
      .then(this.changeSuccess, this.changeFail);
  }
}