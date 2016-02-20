import Bookshelf from '../db';
import Lists from './lists';

export const Food = Bookshelf.Model.extend({
    tableName: 'food',
    lists: function () {
      return this.belongsToMany(Lists);
    },
});

export const FoodCollection = Bookshelf.Collection.extend({
  model: Food
});