export default function homeController(HomeService) {
  this.search = '';
  this.searchResults = [];

  this.changeSuccess = (res) => {
    this.searchResults = res.data;
  }

  this.changeFail = (err) => {
    console.log(err);
  }

  this.onchange = () => {
    HomeService.getFoodOptions(this.search)
      .then(this.changeSuccess, this.changeFail);
  }
}