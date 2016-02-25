import request from 'superagent';
import config from '../config';
import { Foods, Food } from '../models/foods';
import { client } from '../app';
import { List }  from '../models/lists';

function getFoodQuery(query) {
  return new Promise(function(resolve, reject) {
    request
      .get('https://apibeta.nutritionix.com/v2/autocomplete')
      .query(query)
      .set({'X-APP-ID': config.appId})
      .set({'X-APP-KEY': config.appKey})
      .end(function(err, results) {
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
  Promise.resolve().then(function(results) {
    if (results) {
      return JSON.parse(results);
    } else {
      return getFoodQuery(query);
    }
  }).then(function(results) {
    res.json(results);
  }).catch(function(err){
    res.json(err)
  });
}

export function addToList(req, res, next) {
  if(!parseInt(req.body.id, 10)) {
    return next();
  }
  List.forge({
    id: 1,
  })
  .fetch()
  .then(function(list) {
    Food.forge({
      food_id: req.body.id,
    })
    .fetch()
    .then((food) => {
      list.load(['foods'])
        .then(function(model) {
          console.log(food)
          model.foods().attach([food.id]).then(function(final){
            res.json({ model, list, final });
          });

        });
    });
  });
}