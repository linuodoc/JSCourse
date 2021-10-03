'use strict';

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class App {
  #workouts = []; //store all workouts
  #mapEvent;
  #map; //hold map obj
  #inType; //hold input type value
  constructor(workouts, mapEvent, map) {
    //constructor method called when instactiate
    this._getPosition();
    form.addEventListener('submit', this._newWorkOut.bind(this));
    inputType.addEventListener('change', this._toggleFormInput.bind(this));
  }
  //get position from geolocation and pass to _loadMap()##############################
  _getPosition() {
    //position obj passed to _loadMap()
    navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), () =>
      alert('error loading loc')
    );
  }
  //load Map at current received position##############################
  _loadMap(position) {
    // console.log(position);
    const { latitude, longitude } = position.coords;
    // console.log(`https://www.google.com/maps/@${latitude},${longitude},15z`);
    const currCoords = [latitude, longitude];
    this.#map = L.map('map').setView(currCoords, 13);
    L.tileLayer(
      'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
        id: 'mapbox/light-v10',
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
          'pk.eyJ1IjoibGludW9kb2MiLCJhIjoiY2t0cmFldHR1MHk3ZDJvbDhyd3Z6eWY4OSJ9.AB1pFjhEwe4i2tYY3YmYLQ',
      }
    ).addTo(this.#map);
    //eHandler on Map will call _showForm() with map Obj##############################
    this.#map.on('click', this._showForm.bind(this));
    // console.log(this.#map);
  }
  //assign current lat/lng to public variable and showMap##############################
  _showForm(e) {
    this.#mapEvent = e; //assign to public class variable
    // console.log(this.#mapEvent);
    form.classList.remove('hidden'); //display form
    inputDistance.focus();
  }
  _toggleFormInput() {
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  }
  _renderWorkoutMarker(workout) {
    // const [lat, lng] = workout.coords;
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          closeOnClick: false,
          autoClose: false,
          className: `${this.#inType}-popup`,
        })
      )
      .setPopupContent('workout')
      .openPopup();
  }
  _renderWorkoutList(workout) {
    let html = `<li class="workout workout--${workout.type}" data-id="${
      workout.id
    }">
          <h2 class="workout__title">${workout.description}</h2>
          <div class="workout__details">
            <span class="workout__icon">${
              workout.type === 'running' ? '🏃‍♂️' : '🚴'
            }</span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workout.duration}</span>
            <span class="workout__unit">min</span>
          </div>`;
    if (workout.type === 'running') {
      html += `<div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.pace.toFixed(1)}</span>
            <span class="workout__unit">min/km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">🦶🏼</span>
            <span class="workout__value">${workout.cadence}</span>
            <span class="workout__unit">spm</span>
          </div>
        </li>`;
    }
    if (workout.type === 'cycling') {
      html += `<div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.speed.toFixed(1)}</span>
            <span class="workout__unit">km/h</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⛰</span>
            <span class="workout__value">${workout.elevationGain}</span>
            <span class="workout__unit">m</span>
          </div>
        </li>`;
    }
    containerWorkouts.insertAdjacentHTML('afterbegin', html);
  }
  _newWorkOut(e) {
    // helper functions
    const validInputs = (...inputs) =>
      inputs.every(inp => Number.isFinite(inp));
    const postiveInputs = (...inputs) => inputs.every(inp => inp > 0);
    const clearInputs = () => {
      inputDistance.value =
        inputDuration.value =
        inputCadence.value =
        inputElevation.value =
          '';
      inputDistance.focus();
    };

    e.preventDefault();

    //get data from form##############################
    this.#inType = inputType.value;
    const distance = +inputDistance.value; //+ convert input from str to no
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;

    //if workout is running ,create running obj##############################
    if (this.#inType === 'running') {
      const cadence = +inputCadence.value;
      //check if data is valid
      if (
        !validInputs(distance, duration, cadence) ||
        !postiveInputs(distance, duration, cadence)
        // !Number.isFinite(distance) ||
        // !Number.isFinite(duration) ||
        // !Number.isFinite(cadence)
      ) {
        clearInputs();
        return alert('pls enter +no');
      }
      workout = new Running(distance, duration, [lat, lng], cadence);
    }

    //if workout is cycling,create cyclying obj##############################
    if (this.#inType === 'cycling') {
      const elevation = +inputElevation.value;
      //check if data is valid
      if (
        !validInputs(distance, duration, elevation) ||
        !postiveInputs(distance, duration)
      )
        return alert('pls enter +no');
      workout = new Cycling(distance, duration, [lat, lng], elevation);
    }

    //add new object to workout array##############################
    this.#workouts.push(workout);
    console.log(this.#workouts);

    //render workout on map as marker##############################
    this._renderWorkoutMarker(workout);

    //render workout on list##############################
    this._renderWorkoutList(workout);

    // hied form + clear input fileds###########
    clearInputs();
    form.classList.add('hidden');
  }
}
class Workout {
  #id;
  date = new Date();
  constructor(distance, duration, coords) {
    this.distance = distance; // in km
    this.duration = duration; // in min
    this.coords = coords;
    this._idGenerator();
  }
  _idGenerator() {
    let min = 10000;
    let max = 99999;
    this.#id = Date.now() + Math.floor(Math.random() * (max - min + 1)) + min;
  }
  _setDescirption() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }
}

class Cycling extends Workout {
  type = 'cycling';
  constructor(distance, duration, coords, elevationGain) {
    super(distance, duration, coords);
    this.elevationGain = elevationGain;
    this.calcSpeed();
    this._setDescirption();
  }
  calcSpeed() {
    // km/hr
    this.speed = this.distance / this.duration / 60;
    return this.speed;
  }
}
class Running extends Workout {
  type = 'running';
  constructor(distance, duration, coords, cadence) {
    super(distance, duration, coords);
    this.cadence = cadence;
    this.calcPace();
    this._setDescirption();
  }
  calcPace() {
    //min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}
//Start App###########
new App();
