require('dotenv').config({ path: '../.env'});
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
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

// FILES
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/calendar.html'));
});

app.get('/profile', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/profile.html'));
});

app.get('/assets/profile-picture', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/assets/profile-picture-placeholder.png'));
});

app.get('/stylesheet', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/styles.css'));
});

app.get('/javascript/calendar', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/calendar.js'));
});

app.get('/javascript/profile', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/profile.js'));
});

app.get('/calendar-lib/stylesheet', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/lib/calendar.css'));
});

app.get('/calendar-lib/javascript', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/lib/calendar.js'));
});

// USERS
app.get('/api/users/:userId', getUser);
app.put('/api/users/:userId', updateUser);

// WORKOUTS
app.get('/api/users/:userId/workouts', getUserWorkouts);
app.post('/api/users/:userId/workouts', createUserWorkout);
app.delete('/api/users/:userId/workouts/:workoutId', deleteUserWorkout);

// GENDERS
app.get('/api/genders', getGenders);

const port = process.env.PORT || 4004;

app.listen(port, () => console.log(`up on ${port}`));