// //////////////////////////////////////////////////////
// /////////////////////////////////////////////////////
// //Global vars
// let map, mapEvent;

// navigator.geolocation.getCurrentPosition(
//   function (position) {
//     // console.log(position);
//     const { latitude, longitude } = position.coords;
//     // console.log(`https://www.google.com/maps/@${latitude},${longitude},15z`);
//     const currCoords = [latitude, longitude];
//     map = L.map('map').setView(currCoords, 13);
//     L.tileLayer(
//       'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
//       {
//         attribution:
//           'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//         maxZoom: 18,
//         id: 'mapbox/light-v10',
//         tileSize: 512,
//         zoomOffset: -1,
//         accessToken:
//           'pk.eyJ1IjoibGludW9kb2MiLCJhIjoiY2t0cmFldHR1MHk3ZDJvbDhyd3Z6eWY4OSJ9.AB1pFjhEwe4i2tYY3YmYLQ',
//       }
//     ).addTo(map);
//     // var marker = L.marker(currCoords)
//     //   .addTo(map)
//     //   .bindPopup(
//     //     `<b>Hello world!</b><br>I am at ur current coordinates.<br>lat:${latitude} <br>lng:${longitude}`
//     //   )
//     //   .openPopup();

//     map.on('click', function (e) {
//       mapEvent = e; //assign to global variable
//       form.classList.remove('hidden'); //display form
//       inputDistance.focus();
//     });
//   },
//   function () {
//     alert('cannot locate your location');
//   }
// );

// //display marker on submit event###########
// form.addEventListener('submit', function (e) {
//   //   console.log(mapEvent);
//   e.preventDefault();
//   const { lat, lng } = mapEvent.latlng;
//   L.marker([lat, lng])
//     .addTo(map)
//     .bindPopup(
//       L.popup({
//         maxWidth: 250,
//         minWidth: 100,
//         closeOnClick: false,
//         autoClose: false,
//         className: 'running-popup',
//       })
//     )
//     .setPopupContent('Workout')
//     .openPopup();

//   // clear input fileds###########
//   inputDistance.value =
//     inputDuration.value =
//     inputCadence.value =
//     inputElevation.value =
//       '';
// });
// // toggle form input fileds###########
// inputType.addEventListener('change', function () {
//   inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
//   inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
// });

// form hide#############
// form.classList.add('hidden');
// const html = `<li class="workout workout--running" data-id="1945835906">
//   <h2 class="workout__title">Running on September 18</h2>
//   <div class="workout__details">
//     <span class="workout__icon">🏃‍♂️</span>
//     <span class="workout__value">1.5</span>
//     <span class="workout__unit">km</span>
//   </div>
//   <div class="workout__details">
//     <span class="workout__icon">⏱</span>
//     <span class="workout__value">50</span>
//     <span class="workout__unit">min</span>
//   </div>

//   <div class="workout__details">
//     <span class="workout__icon">⚡️</span>
//     <span class="workout__value">33.3</span>
//     <span class="workout__unit">min/km</span>
//   </div>
//   <div class="workout__details">
//     <span class="workout__icon">🦶🏼</span>
//     <span class="workout__value">187</span>
//     <span class="workout__unit">spm</span>
//   </div>
// </li>`;
// containerWorkouts.insertAdjacentHTML('afterbegin', html);
