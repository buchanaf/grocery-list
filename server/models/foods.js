import Bookshelf from '../db';
import { List } from './lists';

export const Food = Bookshelf.Model.extend({
  tableName: 'foods',
  lists: () => this.belongsToMany(List).withPivot([
    'complete',
    'quantity',
    'measurement',
    'category',
  ]),
});

export const Foods = Bookshelf.Collection.extend({
  model: Food,
});
