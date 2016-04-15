import angular from 'angular' ;
console.log('here');
export default () => ({
  restrict: 'A',
  link: (scope, elem, attrs) => {
    const limit = parseInt(attrs.inputLimit, 10);
    angular.element(elem).on('keypress', (e) => {
      if (e.target.value.length > limit - 1) {
        e.preventDefault();
      }
    });
  },
});
