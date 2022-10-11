const newWorkoutModal = document.querySelector("#new-workout-modal");
const saveNewWorkoutButton = document.querySelector("#save-new-workout-btn");
const closeNewWorkoutButton = document.querySelector("#close-new-workout-btn");
const calendarEl = document.querySelector('#calendar');
const workoutForm = document.querySelector('#workout-form');
const workoutTitleInput = document.querySelector('#input-title');
const workoutDateInput = document.querySelector('#input-date');
const workoutStartTimeInput = document.querySelector('#input-start-time');
const workoutDurationInput = document.querySelector('#input-duration');
const workoutCaloriesInput = document.querySelector('#input-calories');

const baseURL = 'http://localhost:4004';
// TODO: This userId should be obtained from an authentication function
const userId = '1';

let workouts = [];
let calendar = new FullCalendar.Calendar(calendarEl, {
  initialDate: Date.now(),
  editable: false,
  selectable: true,
  businessHours: false,
  dayMaxEvents: true, // allow "more" link when too many events
  select: function(arg) {
    newWorkoutModal.style.display = "block";
    workoutDateInput.value = arg.start.toLocaleDateString();
  },
  events: workouts
});

console.log(calendar);

function closeWorkoutModal() {
  newWorkoutModal.style.display = "none";
}

function getWorkouts() {
  axios.get(`${baseURL}/api/users/${userId}/workouts`)
  .then(res => {
    workouts = res.data.map((w) => {
      return {
        id: w.id,
        title: w.title,
        start: w.start_time,
        end: w.end_time
      }
    });
    
    for(let i = 0; i < workouts.length; i++) {
      calendar.addEvent(workouts[i]);
    }
  });
}

function addWorkout(e) {
  e.preventDefault()

  if (!workoutTitleInput.value) {
    alert ('You must enter a workout title.');
    return;
  }

  if (!workoutStartTimeInput.value) {
    alert ('You must enter a workout start time.');
    return;
  }

  if (!workoutDurationInput.value) {
    alert ('You must enter a workout duration.');
    return;
  }

  let startTime = new Date(workoutDateInput.value);
  let [hours, minutes] = workoutStartTimeInput.value.split(":");
  startTime.setHours(hours, minutes);

  let endTime = new Date();
  endTime.setTime(startTime.getTime() + workoutDurationInput.value * 60000);

  let body = {
    user_id: userId,
    title: workoutTitleInput.value,
    start_time: startTime,
    end_time: endTime,
    duration: workoutDurationInput.value,
    calories: workoutCaloriesInput.value
  }

  axios.post(`${baseURL}/api/users/${userId}/workouts`, body)
  .then(()=> {
    calendar.addEvent({
      title: body.title,
      start: body.start_time,
      end: body.end_time
    });
  });
}

document.addEventListener('DOMContentLoaded', function() {
  getWorkouts();
  calendar.render();
});

closeNewWorkoutButton.addEventListener('click', closeWorkoutModal);
workoutForm.addEventListener('submit', addWorkout);