export default function listService($interval, $log, $http) {
  const listData = {
    selectedList: null,
    lists: [],
  };

  return {
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

    setList: (id) => {
      listData.selectedList = listData.lists.filter(list => parseInt(id, 10) === list.id)[0];
    },

    getFoodOptions: (query) => $http.get(`/api/food?q=${query}`),

    postFoodItem: (food, list) => $http.post('/api/food', { food, list })
      .then((results) => {
        listData.selectedList.foods = results.data.data;
        return results.data.data;
      }),

    getUserLists: () => $http.get('/api/list')
      .then((results) => {
        listData.lists = results.data.data;
        return results.data.data;
      }),

    updateList: (foodId) => $http.put('/api/list', {
      id: listData.selectedList.id, foodId,
    }),

    formatDate: (dateObj) => {
      const d = new Date(dateObj);
      const year = d.getFullYear();
      let month = `${d.getMonth() + 1}`;
      let day = `${d.getDate()}`;

      if (month.length < 2) { month = `0${month}`; }
      if (day.length < 2) { day = `0${day}`; }

      return [year, month, day].join('-');
    },

    getState: () => listData,

  };
}
