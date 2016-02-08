import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import controllers from './controllers';
import config from './config'
import compression from 'compression';
import bluebird from 'bluebird';
import redis from 'redis';

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const app = express();
const client = redis.createClient();

app.use(express.static(path.join(__dirname, '..')));
app.use(compression());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(controllers);


app.listen(config.port, function() {
  console.log('Listening on port ' + config.port)
})

client.on('connect', function() {
    console.log('connected');
});

export { client };
