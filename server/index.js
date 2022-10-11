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
app.get('/api/users/:userId', getUser);
app.put('/api/users/:userId', updateUser);

// WORKOUTS
app.get('/api/users/:userId/workouts', getUserWorkouts);
app.post('/api/users/:userId/workouts', createUserWorkout);
app.delete('/api/users/:userId/workouts/:workoutId', deleteUserWorkout);

// GENDERS
app.get('/api/genders', getGenders);

app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`))