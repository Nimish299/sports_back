const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const playerRoute = require('./routes/PlayerRoute');
const coachRoute = require('./routes/CoachRoute');
const academyRoute = require('./routes/AcademyRoute');
const playerPostRoute = require('./routes/PlayerPostRoute');

const app = express();
// app.use(cors());
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Content-Type, Origin , Accept, X-Requested-With'
//   );
//   next();
// });
// app.use(cors);

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  console.log(req.path, '  ', req.method);
  console.log(req.body);
  next();
});

app.use('/api/player', playerRoute);
app.use('/api/coach', coachRoute);
app.use('/api/academy', academyRoute);
app.use('/api/playerpost', playerPostRoute);

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('connected to db');
    });
  })
  .catch((err) => {
    console.log(err);
  });
