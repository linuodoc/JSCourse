'use strict';

const juliaData = [3, 5, 2, 12, 7];
const juliaData2 = [9, 16, 6, 8, 3];
const kateData = [4, 1, 15, 8, 3];
const kateData2 = [10, 5, 6, 1, 4];
const data1 = [5, 2, 4, 1, 15, 8, 3];
const data2 = [16, 6, 10, 5, 6, 1, 4];

//CHALLENGE 2
const calcAverageHumanAge = function (agesArr) {
  let humanAges = agesArr.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
  let adults = humanAges.filter(adultage => adultage >= 18);
  let avg = adults.reduce((acc, cr) => acc + cr, 0) / adults.length;
  return [humanAges, adults, avg];
};
//With Chaning Methods##########
const dogAges = function (agesArr) {
  let humanAges = agesArr
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(adultage => adultage >= 18)
    .reduce((acc, cr, i, arr) => acc + cr / arr.length, 0);
  return humanAges;
};
console.log(dogAges(data1));

//CHALLENGE 1
const checkDogAge = function (dogsJulia, dogsKate) {
  const juilasdogCopy = [...dogsJulia];
  juilasdogCopy.splice(0, 1);
  juilasdogCopy.splice(-2);
  const correctData = [...juilasdogCopy, ...dogsKate];
  const dogTable = document.querySelector('.movements');
  dogTable.innerHTML = '';
  const [humanAges] = calcAverageHumanAge(correctData);
  humanAges.forEach((element, i) => {
    const type = element >= 18 ? 'adult' : 'puppy';
    const html = `
    <div class="movements__row">
        <div class="movements__type movements__type--${type}"> ${i + 1}</div>
        <div class="movements__value"> ${
          type === 'adult'
            ? `${element} years old adult dog`
            : `${element} years old puppy🐶`
        }</div>
        </div>
    </div>`;
    dogTable.insertAdjacentHTML('afterbegin', html);
  });
};
checkDogAge(juliaData, kateData);

// <div class="movements__value"> HumanAge ${element}

/** CHALLENEGE 2
Create a function 'calcAverageHumanAge', which accepts an arrays of dog's
ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: 
if the dog is <= 2 years old,humanAge = 2 * dogAge
If the dog is > 2 years old, humanAge = 16 + dogAge * 4

2. Exclude all dogs that are less than 18 human years old (which is the same as
keeping dogs that are at least 18 years old)

3. Calculate the average human age of all adult dogs (you should already know
from other challenges how we calculate averages 😉)

4. Run the function for both test datasets
 */

// const dogAges = function (agesArr) {
//   // console.log(agesArr);
//   let humanAges = agesArr.map((age, i, arr) => {
//     if (age <= 2) return 2 * age;
//     else return 16 + age * 4;
//   });
//   // console.log(humanAges);
//   return function (ageFilter) {
//     let filtteredAges = humanAges.filter(adultage => adultage > ageFilter);
//     // console.log(filtteredAges);
//     return function () {
//       let avg =
//         filtteredAges.reduce((acc, cr) => acc + cr, 0) / filtteredAges.length;
//       return avg;
//     };
//   };
// };
// const x = dogAges(data1)(18);
// console.log(x());
