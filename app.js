const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRoutes = require('./modules/routes/routes');
const databaseConfig = require('./config/databaseConfig');
const appConfig = require('./config/appConfig');

const app = express();

const url = `mongodb+srv://${databaseConfig.username}:${databaseConfig.password}@cluster0.i2ikn.mongodb.net/expense?retryWrites=true&w=majority`;

app.use(bodyParser.json());
app.use(cors());
app.use('/', apiRoutes);

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    app.listen(`${appConfig.PORT}`, () => {
      console.log(`Example app listening on port ${appConfig.PORT}!`)
    });
  })
  .catch(() => console.log('Failed to connect to DB'));
