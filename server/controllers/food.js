import request from 'superagent';
import config from '../config';
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
          client.setAsync(query, JSON.stringify(results.body))
          resolve(results.body);
        }
      });
  });
}

export default function foodController(req, res) {
  const query = req.query;
  client.getAsync(query.q).then(function(results, err) {
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

