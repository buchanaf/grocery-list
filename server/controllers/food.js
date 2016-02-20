import request from 'superagent';
import config from '../config';
import { FoodCollection } from '../models/food';
import { client } from '../app';

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
          const foodItems = FoodCollection.forge([
            ...results.body.map((food) => ({ name: food.text, food_id: food.id })),
          ]);
          Promise.all(foodItems.invoke('save')).then(function(res, err) {
            console.log(res, err);
          });

          // client.setAsync(query.q, JSON.stringify(results.body))
        }
      });
  });
}

export default function foodController(req, res) {
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

