import Bookshelf from '../db.js';
import { Food } from './foods';
import { User } from './users';

export const List = Bookshelf.Model.extend({
  tableName: 'lists',

  hasTimestamps: true,

  foods: function() {
    return this.belongsToMany(Food);
  },

  user: function() {
    return this.belongsTo(User);
  },
});
