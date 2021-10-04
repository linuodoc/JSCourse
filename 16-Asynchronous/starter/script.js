'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

//SYNCHRONOUS
// const p = document.querySelector('.p');
// p.textContent = 'My name is AboAbood';
// alert('Text Set !');
// p.style.color = 'red';

//ASYNCHRONOUS
const p = document.querySelector('.p');
setTimeout(() => {
  p.textContent = 'My name is AboAbood';
}, 5000);
p.style.color = 'red';
//these lines will continue be excuted
console.log('i just got excuted');
p.textContent = 'heloo';
