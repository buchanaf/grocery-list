import Bookshelf from '../db';
import Lists from './lists';

export default Bookshelf.Model.extend({
    tableName: 'food'
    lists: function () {
      return this.belongsToMany(Lists);
    },
});
