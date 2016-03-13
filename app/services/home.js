export default function homeService($interval, $log, $http) {
  const homeData = {
    selectedList: null,
    lists: [],
  };

  return {
    getFoodOptions: function(query) {
      return $http.get('/api/food?q=' + query);
    },

    facebookLogin: function(query) {
      return $http.get('/auth/facebook');
    },

    postFoodItem: function(item) {
      return $http.post('/api/food', item);
    },

    addList: function(name) {
      return $http.post('/api/list', { title: name });
    },

    deleteList: function(id) {
      const config = {
        method: 'DELETE',
        url: '/api/list',
        data: { id },
        headers: {'Content-Type': 'application/json;charset=utf-8'}
      };
      return $http(config);
    },

    getUserLists: function() {
      return $http.get('/api/list')
        .then(function(data) {
          homeData.lists = data.data.lists;
          return data;
        });
    },

    setSelectedList: function(listIndex) {
      homeData.selectedList = homeData.lists[listIndex]
    },

    formatDate: function(dateObj) {
      var d = new Date(dateObj),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();

      if (month.length < 2) { month = '0' + month; }
      if (day.length < 2) { day = '0' + day; }

      return [year, month, day].join('-');
    },

    getState: function() {
      return homeData;
    },

  }
}
