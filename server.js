const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const playerRoute = require('./routes/PlayerRoute');
const coachRoute = require('./routes/CoachRoute');
const academyRoute = require('./routes/AcademyRoute');
const playerPostRoute = require('./routes/PlayerPostRoute');
const { setCorsHeaders } = require('./middleware/corsMiddleware');

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Enable CORS globally using the middleware
app.use(setCorsHeaders);

// Logging middleware
app.use((req, res, next) => {
  console.log('Incoming request:', req.method, req.url);
  next();
});

// Routes
app.use('/api/player', playerRoute);
app.use('/api/coach', coachRoute);
app.use('/api/academy', academyRoute);
app.use('/api/playerpost', playerPostRoute);

// Database connection and server start
mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('Server started on port', process.env.PORT);
      console.log('Connected to database');
    });
  })
  .catch((err) => {
    console.error('Error connecting to database:', err);
  });
