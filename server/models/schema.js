var Schema = {
  users: {
    id: { type: 'increments', nullable: false, primary: true },
    facebook_id: { type: 'string', maxlength: 254, nullable: false, unique: true },
    email: { type: 'string', maxlength: 254, nullable: false, unique: true },
    name: { type: 'string', maxlength: 150, nullable: false }
  },
  food: {
    id: { type: 'increments', nullable: false, primary: true },
    name: { type: 'string', maxlength: 150, nullable: false },
  },
  lists: {
    id: { type: 'increments', nullable: false, primary: true },
    user_id: { type: 'integer', nullable: false, unsigned: true },
    category_id: { type: 'integer', nullable: false, unsigned: true },
    title: { type: 'string', maxlength: 150, nullable: false },
    created_at: { type: 'dateTime', nullable: false },
    updated_at: { type: 'dateTime', nullable: true }
  },
};

module.exports = Schema;