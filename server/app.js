import express from 'express';
import bluebird from 'bluebird';
import bodyParser from 'body-parser';
import controllers from './controllers';
import config from './config'
import cookieParser from 'cookie-parser';
import compression from 'compression';
import path from 'path';
import redis from 'redis';
import session from 'express-session';

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const app = express();
const client = redis.createClient();

app.use(express.static(path.join(__dirname, '..')));
app.use(compression());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(controllers);
app.use(cookieParser());
app.use(bodyParser());
app.use(session({ secret: 'cookie-monster' }));
app.use(passport.initialize());
app.use(passport.session());

app.listen(config.port, function() {
  console.log('Listening on port ' + config.port)
})

client.on('connect', function() {
    console.log('connected');
});

export { client };
