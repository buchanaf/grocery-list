export default function homeController(ListService, AuthService, initialData) {
  this.selectedItem = null;
  this.lists = initialData.lists;

  this.searchText = '';
  this.listName = '';

  this.addList = () => ListService.addList(this.listName)
    .then((results) => {
      this.lists.push(results.data.data.list);
    });

  this.deleteList = (id) => ListService.deleteList(id)
    .then(() => {
      this.lists = this.lists.filter(list => list.id !== id);
    });

  this.setSelectedList = (listIndex) => ListService.setSelectedList(listIndex);
}

