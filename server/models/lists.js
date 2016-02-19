import Bookshelf from '../db.js';
import Food from './food';

export default Bookshelf.Model.extend({
  tableName: 'lists',
  food: function() {
    return this.belongsToMany(Food);
  }
});
