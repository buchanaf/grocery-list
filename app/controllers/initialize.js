export default function initializeController(AuthService) {
  return function() {
    Promise.all([
      AuthService.getCurrentUser(),
    ])
  }
}

