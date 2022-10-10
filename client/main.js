let newWorkoutModal = document.querySelector("#new-workout-modal");
let closeNewWorkoutButton = document.querySelector("#close-new-workout-btn");

let newWorkoutDateInput = document.querySelector("#inputDate");

document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');

  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialDate: Date.now(),
    editable: false,
    selectable: true,
    businessHours: false,
    dayMaxEvents: true, // allow "more" link when too many events
    select: function(arg) {
      newWorkoutModal.style.display = "block";
      newWorkoutDateInput.value = arg.start.toLocaleDateString();
    },
    events: [
      {
        title: 'All Day Event',
        start: '2022-10-01'
      },
      {
        title: 'Long Event',
        start: '2022-10-07',
        end: '2022-10-10'
      },
      {
        title: 'Conference',
        start: '2022-10-11',
        end: '2022-10-13'
      },
      {
        title: 'Meeting',
        start: '2022-10-12T10:30:00',
        end: '2022-10-12T12:30:00'
      },
      {
        title: 'Lunch',
        start: '2022-10-12T12:00:00'
      },
      {
        title: 'Meeting',
        start: '2022-10-12T14:30:00'
      },
      {
        title: 'Happy Hour',
        start: '2022-10-12T17:30:00'
      },
      {
        title: 'Dinner',
        start: '2022-10-12T20:00:00'
      },
      {
        title: 'Birthday Party',
        start: '2022-10-13T07:00:00'
      },
      {
        title: 'Click for Google',
        url: 'http://google.com/',
        start: '2022-10-28'
      }
    ]
  });

  calendar.render();
});

function closeModal() {
  newWorkoutModal.style.display = "none";
}

closeNewWorkoutButton.addEventListener('click', closeModal);