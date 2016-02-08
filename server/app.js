import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import controllers from './controllers';
import config from './config'
import compression from 'compression';

const app = express();

app.use(express.static(path.join(__dirname, '..')));
app.use(compression());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(controllers);


app.listen(config.port, function() {
  console.log('Listening on port ' + config.port)
})