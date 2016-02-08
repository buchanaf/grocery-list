import request from 'superagent';
import config from '../config';

export default function foodController(req, res) {
  return new Promise(function(resolve, reject) {
    request
      .get('https://apibeta.nutritionix.com/v2/autocomplete')
      .query(req.query)
      .set({'X-APP-ID': config.appId})
      .set({'X-APP-KEY': config.appKey})
      .end(function(err, results) {
        if (err) {
          res.json(err);
        } else {
          res.json({data: results.body});
        }
        resolve();
      });
  });
}