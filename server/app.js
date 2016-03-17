import express from 'express';
import bluebird from 'bluebird';
import bodyParser from 'body-parser';
import controllers from './controllers';
import config from './config';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import passport from 'passport';
import path from 'path';
import redis from 'redis';
import session from 'express-session';
import redisSession from 'connect-redis';

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

require('./config/passport')(passport);

const app = express();
const client = redis.createClient();
const PersistSession = redisSession(session);
const RedisStore = new PersistSession({
  host: '127.0.0.1',
  port: 6379,
  prefix: 'session',
  pass: 'cookies',
});

app.use(express.static(path.join(__dirname, '..')));
app.use(compression());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  store: RedisStore,
  secret: 'cookie-monster',
  resave: true,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(controllers);

app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}.`);
});

client.on('connect', () => {
  console.log('connected');
});

export { client };
