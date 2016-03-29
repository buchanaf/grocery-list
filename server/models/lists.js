import Bookshelf from '../db.js';
import { Food } from './foods';
import { User } from './users';

export const List = Bookshelf.Model.extend({
  tableName: 'lists',

  hasTimestamps: true,

  foods: function foods() {
    return this.belongsToMany(Food).withPivot([
      'complete',
      'quantity',
      'measurement',
      'category',
    ]);
  },

  user: function user() {
    return this.belongsTo(User);
  },
});
