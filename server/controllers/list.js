import request from 'superagent';
import config from '../config';
import { List }  from '../models/lists';
import { client } from '../app';

export function addNewList(req, res) {
  List.forge({
    user_id: req.user.id,
    title: 'New Grocery List'
  })
  .save()
  .then((list) => {
    res.json({error: false, data: { message: 'List saved', list }});
  });
}
