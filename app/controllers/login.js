export default function loginController(HomeService) {
  this.facebookLogin = () => {
    HomeService.facebookLogin();
  }
}