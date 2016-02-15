import Bookshelf from '../db.js';

const User = Bookshelf.Model.extend({
  tableName: 'users',
});
