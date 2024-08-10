import rootRoute from './routes';

// import path from 'path';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import requestIp from 'request-ip';

const app = express();
const router = express.Router();

// app.use(express.static(path.join(__dirname, 'app')))
app.use(cors());
app.use(compression());
app.use(requestIp.mw())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

rootRoute(router);

app.use('/api', router);
app.listen(process.env.PORT || 8080, () => {
  console.log('API listening on port 8080!')
})

module.exports = app;
