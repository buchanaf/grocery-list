import Bookshelf from '../db';
import { List } from './lists';

export const Food = Bookshelf.Model.extend({
  tableName: 'foods',
  lists: function () {
    return this.belongsToMany(List);
  },
});

export const Foods = Bookshelf.Collection.extend({
  model: Food
});