const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRoutes = require('./modules/routes/routes');
require('dotenv').config({ path: require('find-config')('.env') });

const app = express();
const url = process.env.MONGO_URL;

app.use(bodyParser.json());
app.use(cors());
app.use('/', apiRoutes);

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Example app listening on port ${process.env.PORT}!`)
    });
  })
  .catch((err) => console.log('Failed to connect to DB: ', err));
