const express = require('express');
const dotenv = require('dotenv').config();

const port = process.env.PORT || 5000;

const { errorHandler } = require('./middleware/errorMiddleware');
const workoutRoutes = require('./routes/workoutRoutes');

const app = express();

//* Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/workouts', workoutRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
