const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();

const port = process.env.PORT || 5000;

const { errorHandler } = require('./middleware/errorMiddleware');
const { connectDB } = require('./config/db');
const workoutRoutes = require('./routes/workoutRoutes');
const userRoutes = require('./routes/userRoutes');

connectDB();

const app = express();

//* Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/workouts', workoutRoutes);
app.use('/api/users', userRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
