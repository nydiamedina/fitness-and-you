require('dotenv').config({ path: '../.env'});
const express = require('express');
const app = express();
const cors = require('cors');
const { SERVER_PORT } = process.env;
const {
  getUser,
  updateUser, 
  getUserWorkouts, 
  createUserWorkout, 
  deleteUserWorkout,
  getGenders
} = require('./controller.js');

app.use(express.json());
app.use(cors());

// USERS
app.get('/users/:userId', getUser);
app.put('/users/:userId', updateUser);

// WORKOUTS
app.get('/users/:userId/workouts', getUserWorkouts);
app.post('/users/:userId/workouts', createUserWorkout);
app.delete('/users/:userId/workouts/:workoutId', deleteUserWorkout);

// GENDERS
app.get('/genders', getGenders);

app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`))