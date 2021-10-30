'use strict';
import { getJSON } from './challenge-geoloc.js';
// ######### Letcures
//CallBack HEll#################
// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 seconds passed');
//     setTimeout(() => {
//       console.log('3 seconds passed');
//       setTimeout(() => {
//         console.log('4 seconds passed');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

//SYNCHRONOUS#################
// const p = document.querySelector('.p');
// p.textContent = 'My name is AboAbood';
// alert('Text Set !');
// p.style.color = 'red';

//ASYNCHRONOUS#################
// const p = document.querySelector('.p');
// setTimeout(() => {
//   p.textContent = 'My name is AboAbood';
// }, 5000);
// p.style.color = 'red';
// //these lines will continue be excuted
// console.log('i just got excuted');
// p.textContent = 'heloo';

//ASYNCHRONOUS#################
// const img = document.querySelector('.dog');
// img.src = './img/dog.png';
// img.addEventListener('load', function () {
//   img.classList.add('fadein');
// });
// // p.style.width = '300px';
// console.log('i just got excuted');

//Simulating ASYNCHRONOUS CALLBACK/MICROTASKS Queue#################
// console.log('Test Start'); //1st
// setTimeout(() => {
//   console.log('0 seconds passed');
// }, 0);
// Promise.resolve('Resolved Promise 1').then(res => console.log(res));
// Promise.resolve('Resolved Promise 2').then(res => {
//   for (var i = 0; i < 1000000000; i++) {} //delay prmoise caus callback qeue to delay
//   console.log(res);
// });
// console.log('Test End'); ///2nd

//BUILDING PROMISE#################
// const lottery = new Promise((resolve, reject) => {
//   console.log('lottery draing in progress...');
//   setTimeout(() => {
//     if (Math.random() >= 0.5) {
//       resolve('You Win');
//     } else {
//       reject(new Error('You lost your money'));
//     }
//   }, 2000);
// });
// lottery.then(res => console.log(res)).catch(err => console.error(err));

//PROMOSEFYING###################
//   const wait = function (seconds) {
//     return new Promise(function (resolve) {
//       setTimeout(resolve, seconds * 1000);
//     });
//   };
//   wait(1)
//     .then(() => {
//       console.log('1 second delay');
//       return wait(1);
//     })
//     .then(() => {
//       console.log('2 second delay');
//       return wait(1);
//     })
//     .then(() => {
//       console.log('3 second delay');
//       return wait(1);
//     })
//     .then(() => {
//       console.log('4 second delay');
//       return wait(1);
//     });

//PROMISE COMBINATOR################### Promise.all
//short circut once any promise reject
const getCountriesCapital = async function (c1, c2, c3) {
  try {
    // const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
    // const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
    // const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);
    // console.log(data1);
    // console.log([data1.capital, data2.capital, data3.capital]);
    const data = await Promise.all([
      getJSON(`https://restcountries.com/v3.1/name/${c1}`),
      getJSON(`https://restcountries.com/v3.1/name/${c2}`),
      getJSON(`https://restcountries.com/v3.1/name/${c3}`),
    ]);
    console.log(data);
    data.map(city => console.log(city[0].capital));
  } catch (err) {
    console.error(err);
  }
};
// getCountriesCapital('egypt', 'portugal', 'spain');

const timeOut = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(() => {
      reject(new Error(`Request Took Too long!`));
    }, sec * 1000);
  });
};

//return array of all promises if fullfiled, if any one failed will be rejected
Promise.all([
  Promise.resolve('Success'),
  Promise.reject('failed'),
  //   Promise.resolve('Success'),
  //   Promise.reject('failed'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

//PROMISE COMBINATOR################### Promise.race
//return the fastest fullfiled promise
(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.com/v3.1/name/italy`),
    getJSON(`https://restcountries.com/v3.1/name/egypt`),
    getJSON(`https://restcountries.com/v3.1/name/mexico`),
    timeOut(1.1),
  ]);
  console.log(res[0]);
})();

Promise.race([getJSON(`https://restcountries.com/v3.1/name/italy`), timeOut(2)])
  .then(res => console.log(res[0]))
  .catch(err => console.error(err));

//PROMISE COMBINATOR################### Promise.allSettled
//No short circut once any promise reject
Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('Success'),
  Promise.resolve('Success'),
  Promise.reject('Success'),
]).then(res => console.log(res));

//PROMISE COMBINATOR################### Promise.any
//ignore all rejected promises and return only any fullfiled ones
Promise.any([
  Promise.reject('failed'),
  Promise.resolve('Success'),
  Promise.resolve('Success '),
  Promise.reject('failed'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));
