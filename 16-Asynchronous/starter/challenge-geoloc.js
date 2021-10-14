'use strict';

/**
In this challenge you will build a function 'whereAmI' which renders a country
only based on GPS coordinates. For that, you will use a second API to geocode
coordinates. So in this challenge, you’ll use an API on your own for the first time 😁
Your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value ('lat')
and a longitude value ('lng') (these are GPS coordinates, examples are in test0
data below).

2. Do “reverse geocoding” of the provided coordinates. Reverse geocoding means
to convert coordinates to a meaningful location, like a city and country name.
Use this API to do reverse geocoding: https://geocode.xyz/api. The AJAX call
will be done to a URL with this format:
https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and
promises to get the data. Do not use the 'getJSON' function we created, that
is cheating 😉

3. Once you have the data, take a look at it in the console to see all the attributes
that you received about the provided location. Then, using this data, log a
message like this to the console: “You are in Berlin, Germany”

4. Chain a .catch method to the end of the promise chain and log errors to the
console

5. This API allows you to make only 3 requests per second. If you reload fast, you
will get this error with code 403. This is an error with the request. Remember,
fetch() does not reject the promise in this case. So create an error to reject
the promise yourself, with a meaningful error message

PART 2
6. Now it's time to use the received data to render a country. So take the relevant
attribute from the geocoding API result, and plug it into the countries API that
we have been using.
7. Render the country and catch any errors, just like we have done in the last
lecture (you can even copy this code, no need to type the same code)
 */

///////////////////////////////////////
export { getJSON };
let key = '25aea0e3c0622946dda465aa72011244';
const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
///////////////////////////////////////
//render data on DOM
const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}">
  <img class="country__img" src="${data.flags.png}" />
  <div class="country__data">
    <h3 class="country__name">${data.altSpellings[0]}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)}</p>
    <p class="country__row"><span>🗣️</span>${
      Object.values(data.languages)[0]
    }</p>
    <p class="country__row"><span>💰</span>${
      Object.values(data.currencies)[0].name
    }</p>
  </div>
</article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};
//render errors
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('afterend', msg);
  // countriesContainer.style.opacity = 1;
};
//HTTPrequest old schoool
const getCounryDataLegacy = function (country) {
  //1st AJAX Call
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/{${country}}`);
  request.send();
  request.addEventListener('load', function () {
    const data = JSON.parse(this.responseText)[0];
    // console.log(data);
    //render country
    renderCountry(data);
    //2nd AJAX Call
    const [neighbour] = data.borders;
    if (!neighbour) return;
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
    request2.send();
    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText)[0];
      console.log(data2);

      //render country neighbour
      renderCountry(data2, 'neighbour');
    });
  });
};
//Retrun Promise from fetch & JSON
const getJSON = function (url, errMsg = 'something went wrong!') {
  return fetch(url).then(resp => {
    if (!resp.ok) throw new Error(`${errMsg}(${resp.status})`);
    return resp.json();
  });
};

//Before Refactoring
const getCounryDataEss = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(resp => {
      if (!resp.ok) {
        throw new Error(`country not found(${resp.status})`);
      }
      return resp.json();
    })
    .then(data => {
      renderCountry(data[0]);
      // console.log(data[0]);
      const neighbour = data[0].borders[0];
      if (!neighbour) throw new Error(`no neighbour found!`);
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then(resp => resp.json())
    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(err => {
      console.log(`${err} ✨✨✨`);
      renderError(`something went wrong✨✨ ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
      // btn.classList.add('hidden');
    });
};
//After Refactoring
const getCounryDataEs = function (country) {
  getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);
      if (data[0].borders === undefined) {
        throw new Error(`no neighbour found!`);
      }
      const neighbour = data[0].borders[0];
      // const neighbour = 'FuckIsrael';
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbour}`,
        'Country not found'
      );
    })
    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(err => {
      console.log(`${err} ✨✨✨`);
      renderError(`something went wrong✨✨ ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
      btn.classList.add('hidden');
    });
};
//DOM API Geolcation with Promise
const getCurrentPos = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
// getPos().then(res => console.log(res));

//with Promise & Then
const whereAmI = function (lat, lng) {
  getCurrentPos()
    .then(pos => {
      console.log(pos);
      const { latitude: lat, longitude: lng } = pos.coords;
      return fetch(
        `http://api.positionstack.com/v1/reverse?access_key=${key}&query=${lat},${lng}`
        // fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
      );
    })
    .then(resp => {
      if (!resp.ok) throw new Error(`something went wrong !(${resp.status})`);
      return resp.json();
    })
    .then(josndata => {
      josndata = josndata.data[0];
      // console.log(josndata);
      console.log(`You are in ${josndata.name}, ${josndata.country}`);
      getCounryDataEs(josndata.country);
    })
    .catch(err => console.error(`${err.message}`));
};

//with Asynch & Await
const AsyncwhereAmI = async function (country) {
  try {
    const pos = await getCurrentPos();
    const { latitude: lat, longitude: lng } = pos.coords;
    const geoCode = await fetch(
      `http://api.positionstack.com/v1/reverse?access_key=${key}&query=${lat},${lng}`
    );
    if (!geoCode.ok) throw new Error('problem with location data');
    const geoData = await geoCode.json();
    // console.log(geoData.data[0]);
    getCounryDataEss(geoData.data[0].country);

    //resolved value of the promise
    return `you are in ${geoData.data[0].locality}, ${geoData.data[0].country}`;
  } catch (err) {
    console.error(`✨${err}`);
    renderError(`✨${err.message}`);
    throw err;
  }
};

//Handlers
// console.log(`1st: start getting location`);
//first solution
// const city = await AsyncwhereAmI();
// console.log(`2: ${city}`);

// //second solution
// AsyncwhereAmI()
//   .then(city => console.log(`2: ${city}`))
//   .catch(err => console.error(`${err.message}`))
//   .finally(() => console.log(`3rd: Finish getting location`));

//3rd solution
// (async function () {
//   try {
//     const data = await AsyncwhereAmI();
//     console.log(`2: ${data}`);
//   } catch (err) {
//     console.error(`✨${err}`);
//   }
//   console.log(`3rd: Finish getting location`);
// })();

btn.addEventListener('click', AsyncwhereAmI);
// btn.addEventListener('click', function () {
//   getCounryDataEs('germany');
// });
// btn.addEventListener('click', whereAmI);
// btn.addEventListener('click', function () {
//   whereAmI(0.0, 0.0);
//   whereAmI(52.508, 13.381);
//   whereAmI(19.037, 72.873);
//   whereAmI(-33.933, 18.474);
// });
