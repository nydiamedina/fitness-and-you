const editProfileButton = document.querySelector('#edit-profile-btn');
const editProfileModal = document.querySelector('#edit-profile-modal');
const saveProfileButton = document.querySelector('#save-profile-btn');
const closeEditProfileButton = document.querySelector('#close-edit-profile-btn');
const nameText = document.querySelector('#name-text');
const genderText = document.querySelector('#gender-text');
const weightText = document.querySelector('#weight-text');
const bodyFatText = document.querySelector('#body-fat-text');
const heightText = document.querySelector('#height-text');
const birthdayText = document.querySelector('#birthday-text');
const nameInput = document.querySelector('#input-name');
const genderInput = document.querySelector('#input-gender');
const weightInput = document.querySelector('#input-weight');
const bodyFatInput = document.querySelector('#input-body-fat');
const bodyFatOutput = document.querySelector('#output-body-fat');
const heightInput = document.querySelector('#input-height');
const birthdayInput = document.querySelector('#input-birthday');

// TO TEST LOCALLY
const baseURL = 'http://localhost:4004';
// TODO: This userId should be obtained from an authentication function
const userId = '1';

let genders = [];

function openEditProfileModal() {
  editProfileModal.style.display = 'block';
}

function closeEditProfileModal() {
  editProfileModal.style.display = 'none';
}

function getGenders() {
  // TO TEST LOCALLY
  // axios.get(`${baseURL}/api/genders`)
  axios.get('/api/genders')
  .then(res => {
    genders = res.data;
    
    genderInput.className = 'capitalize';

    for(let g of genders) {
      let option = document.createElement('option');
      option.className = 'capitalize';
      option.text = g.name;
      option.value = g.id;
      genderInput.appendChild(option);
    }

  });
}

function getUser() {
  // TO TEST LOCALLY
  // axios.get(`${baseURL}/api/users/${userId}`)
  axios.get(`/api/users/${userId}`)
  .then(res => {
    user = res.data;
    
    nameText.innerHTML = user.name;
    genderText.innerHTML = genders.filter(g => g.id === user.gender_id).map(g => g.name);
    genderText.className = 'capitalize';
    weightText.innerHTML = user.weight;
    bodyFatText.innerHTML = user.body_fat;
    heightText.innerHTML = user.height;
    birthdayText.innerHTML = new Date(user.birthday).toLocaleDateString();

    nameInput.value = user.name;
    genderInput.value = user.gender_id;
    weightInput.value = user.weight;
    bodyFatInput.value = user.body_fat;
    bodyFatOutput.innerHTML = user.body_fat;
    heightInput.value = user.height;
    birthdayInput.value = new Date(user.birthday).toLocaleDateString();
  });
}

function updateUser(e) {
  e.preventDefault();

  if (!nameInput.value) {
    alert ('You must enter your name.');
    return;
  }

  if (!genderInput.value) {
    alert ('You must enter your gender.');
    return;
  }

  let body = {
    name: nameInput.value,
    gender_id: genderInput.value,
    weight: weightInput.value,
    body_fat: bodyFatInput.value,
    height: heightInput.value,
    birthday: new Date(birthdayInput.value)
  }

  // TO TEST LOCALLY
  // axios.put(`${baseURL}/api/users/${userId}`, body)
  axios.put(`/api/users/${userId}`)
  .then(() => {
    getUser();
    closeEditProfileModal();
  });
}

editProfileButton.addEventListener('click', openEditProfileModal);
closeEditProfileButton.addEventListener('click', closeEditProfileModal);
saveProfileButton.addEventListener('click', updateUser);

getGenders();
getUser();