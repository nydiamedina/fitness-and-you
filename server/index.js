require('dotenv').config();
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
app.get('/users/:user-id', getUser);
app.put('/users/:user-id', updateUser);

// WORKOUTS
app.get('/users/:user-id/workouts', getUserWorkouts);
app.post('/users/:user-id/workouts', createUserWorkout);
app.delete('/users/:user-id/workouts/:workout-id', deleteUserWorkout);

// GENDERS
app.get('/genders', getGenders);

app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`))