import Bookshelf from '../db.js';

export const User = Bookshelf.Model.extend({
  tableName: 'users',
});

