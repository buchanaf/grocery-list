export default function listController(HomeService, AuthService, $location) {
  const { lists, selectedItem } = HomeService.getState();
  console.log(HomeService.getState());
}

