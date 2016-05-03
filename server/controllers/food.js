import request from 'superagent';
import config from '../config';
import { Foods, Food } from '../models/foods';
import { List } from '../models/lists';

function getFoodQuery(query) {
  return new Promise((resolve, reject) => {
    request
      .get('https://apibeta.nutritionix.com/v2/autocomplete')
      .query(query)
      .set({ 'X-APP-ID': config.appId })
      .set({ 'X-APP-KEY': config.appKey })
      .end((err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results.body);
          const foodItems = Foods.forge([
            ...results.body.map((food) => ({ name: food.text, food_id: food.id })),
          ]);
          Promise.all(foodItems.invoke('save'));
          // client.setAsync(query.q, JSON.stringify(results.body))
        }
      });
  });
}

export function foodQuery(req, res) {
  const query = req.query;
  // client.getAsync(query.q).then(function(results, err) {
  Promise.resolve().then((results) => {
    if (results) {
      return JSON.parse(results);
    }
    return getFoodQuery(query);
  }).then((results) => {
    res.json(results);
  }).catch((err) => {
    res.json(err);
  });
}

export function addToList(req, res) {
  List.forge({
    id: req.body.list,
  })
  .fetch({ withRelated: ['foods'] })
  .then((list) => {
    Food.forge({
      food_id: req.body.food,
    })
    .fetch()
    .then((food) => list.foods().attach([{
      food_id: food.id,
      list_id: list.id,
      quantity: 2,
      measurement: 'cups',
      category: 'deli',
      notes: 'did this work?',
    }]))
    .then(() => {
      List.forge({
        id: req.body.list,
      })
      .fetch({ withRelated: ['foods'] })
      .then((updatedList) => {
        res.json({
          data: updatedList.foods,
        });
      });
    })
    .catch((err) => {
      res.status(500);
      res.json({
        error: {
          list: req.body.list,
          food: req.body.food,
          detail: err,
          type: 'food',
        },
      });
    });
  });
}
