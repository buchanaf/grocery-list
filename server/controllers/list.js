import request from 'superagent';
import config from '../config';
import { List }  from '../models/lists';
import { client } from '../app';

export function addNewList(req, res) {
  List.forge({
    user_id: req.user.id,
    title: req.body.title,
  })
  .save()
  .then((list) => {
    res.json({error: false, data: { message: 'List saved', list }});
  });
}

export function getUserLists(req, res) {
  if (!req.user) {
    return res.json({ lists: null });
  }
  List.forge({
    user_id: req.user.id,
  })
  .fetchAll({ withRelated: ['foods'] })
  .then((lists) => {
    res.json({error: false, lists });
  })
  .catch(function(err) {
    console.log(err)
  });
}

export function deleteList(req, res) {
  List.forge({
    id: req.body.id
  })
  .destroy()
  .then(function(model) {
    res.json({ list: model });
  });
}