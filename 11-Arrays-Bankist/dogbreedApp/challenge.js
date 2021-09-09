"use strict";

const juliaData = [3, 5, 2, 12, 7];
const juliaData2 = [9, 16, 6, 8, 3];
const kateData = [4, 1, 15, 8, 3];
const kateData2 = [10, 5, 6, 1, 4];
const data1 = [5, 2, 4, 1, 15, 8, 3];
const data2 = [16, 6, 10, 5, 6, 1, 4];

//Challenge-4 #########################
/* 
Julia and Kate are still studying dogs, and this time they are stdying if dogs are eating too much or too little.
Eating too much means the dog's 'curFood' > 'recFoodPortion'
Eating too little is the opposite.
Eating an okay amount means the dog's means : 
'curFood' > (recommended * 0.90) && 'curFood' < (recommended * 1.10)
OR 
The 'curFood' portion should be between 90% and 110% of the 'recFoodPortion'.

*/
//TEST DATA:

const dogs = [
  { weight: 22, curFood: 250, owners: ["Alice", "Bob"] },
  { weight: 8, curFood: 200, owners: ["Matilda"] },
  { weight: 13, curFood: 275, owners: ["Sarah", "John"] },
  { weight: 32, curFood: 340, owners: ["Michael"] },
];

// 1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)

dogs.forEach((el) => {
  // const recommendedFood = el.weight ** 0.75 * 28;
  const recommendedFood = Math.floor(el.weight ** 0.75 * 28);
  // const recommendedFood = Math.trunc(el.weight ** 0.75 * 28);
  el["recFood"] = recommendedFood;
});
console.log(dogs);

// // 2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
// Eating too much means the dog's 'curFood' > 'recFood'
// Eating too little is the opposite.
// Eating an okay amount means the dog's means :
// 'curFood' > (recommended * 0.90) && 'curFood' < (recommended * 1.10)

const sarahsDog = function (dogs) {
  const dog = dogs.find((cr) => cr.owners.includes("Sarah"));
  const eat = dog.curFood > dog.recFood ? "much" : "little";
  console.log(`Sarah's dog Eating too ${eat}`);
};
sarahsDog(dogs);

// 3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').

const dogOwnersClassify = function (dogObj) {
  const much = dogObj
    .filter((dog) => dog.curFood > dog.recFood)
    .flatMap((dog) => dog.owners);
  const little = dogObj
    .filter((dog) => dog.curFood < dog.recFood)
    .flatMap((dog) => dog.owners);

  return [much, little];
};
const [ownersEatTooMuch, ownersEatTooLittle] = dogOwnersClassify(dogs);
console.log(ownersEatTooMuch, ownersEatTooLittle);

// 4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
console.log(`${ownersEatTooMuch.join(" and ")}'s dogs eating to much!`);
console.log(`${ownersEatTooLittle.join(" and ")}'s dogs eating to little!`);

// 5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
console.log(dogs.some((dog) => dog.curFood === dog.recFood));

// 6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
const checkDogEatOkay = (dogObj) =>
  dogObj.curFood > dogObj.recFood * 0.9 &&
  dogObj.curFood < dogObj.recFood * 1.1;
console.log(checkDogEatOkay(dogs));

// 7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
console.log(dogs.filter(checkDogEatOkay));

// 8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)
console.log(dogs);
console.log(dogs.slice().sort((a, b) => a.recFood - b.recFood));

////CHALLENGE 3 With Chaning Methods###############
const dogAges = function (agesArr) {
  let humanAges = agesArr
    .map((age) => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter((adultage) => adultage >= 18)
    .reduce((acc, cr, i, arr) => acc + cr / arr.length, 0);
  return humanAges;
};
console.log(dogAges(data1));

//CHALLENGE 2###############
const calcAverageHumanAge = function (agesArr) {
  let humanAges = agesArr.map((age) => (age <= 2 ? 2 * age : 16 + age * 4));
  let adults = humanAges.filter((adultage) => adultage >= 18);
  let avg = adults.reduce((acc, cr) => acc + cr, 0) / adults.length;
  return [humanAges, adults, avg];
};

//CHALLENGE 1###############
const checkDogAge = function (dogsJulia, dogsKate) {
  const juilasdogCopy = [...dogsJulia];
  juilasdogCopy.splice(0, 1);
  juilasdogCopy.splice(-2);
  const correctData = [...juilasdogCopy, ...dogsKate];
  const dogTable = document.querySelector(".movements");
  dogTable.innerHTML = "";
  const [humanAges] = calcAverageHumanAge(correctData);
  humanAges.forEach((element, i) => {
    const type = element >= 18 ? "adult" : "puppy";
    const html = `
    <div class="movements__row">
        <div class="movements__type movements__type--${type}"> ${i + 1}</div>
        <div class="movements__value"> ${
          type === "adult"
            ? `${element} years old adult dog`
            : `${element} years old puppy🐶`
        }</div>
        </div>
    </div>`;
    dogTable.insertAdjacentHTML("afterbegin", html);
  });
};
checkDogAge(juliaData, kateData);

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
