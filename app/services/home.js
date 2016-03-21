export default function homeService($interval, $log, $http) {
  const homeData = {
    selectedList: null,
    lists: [],
  };

  return {
    getFoodOptions: (query) => $http.get(`/api/food?q=${query}`),

    facebookLogin: () => $http.get('/auth/facebook'),

    postFoodItem: (food, list) => $http.post('/api/food', { food, list })
    .then((results) => {
      homeData.selectedList.foods = results.data.data;
      return results.data.data;
    }),

    addList: (name) => $http.post('/api/list', { title: name }),

    deleteList: (id) => {
      const config = {
        method: 'DELETE',
        url: '/api/list',
        data: { id },
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
      };
      return $http(config);
    },

    getUserLists: () => $http.get('/api/list')
      .then((results) => {
        homeData.lists = results.data.data;
        return results.data.data;
      }),

    updateList: (foodId) => $http.put('/api/list', {
      id: homeData.selectedList.id, foodId,
    }),

    setList: (id) => {
      homeData.selectedList = homeData.lists.filter(list => parseInt(id, 10) === list.id)[0];
    },

    formatDate: (dateObj) => {
      const d = new Date(dateObj);
      const year = d.getFullYear();
      let month = `${d.getMonth() + 1}`;
      let day = `${d.getDate()}`;

      if (month.length < 2) { month = `0${month}`; }
      if (day.length < 2) { day = `0${day}`; }

      return [year, month, day].join('-');
    },

    getState: () => homeData,

  };
}
