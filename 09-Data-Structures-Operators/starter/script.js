'use strict';

const weekDays = ['sat', 'sun', 'mon', 'tus', 'wed', 'thu', 'fri'];
const openingHours = {
  [weekDays[6]]: {
    open: 12,
    close: 22,
  },
  fri: {
    open: 11,
    close: 23,
  },
  sat: {
    open: 0, // Open 24 hours
    close: 24,
  },
};
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  openingHours, //ECMA Obj literal enhancements

  //ECMA Obj literal enhancements (no keyword functoin)
  order(strIdx, mainIdx) {
    return [this.starterMenu[strIdx], this.mainMenu[mainIdx]];
  },
  orderDeleivery: function ({ strIdx = 1, mainIdx = 1, time = 0.0, address }) {
    console.log(
      `Order Recieved! "${this.starterMenu[strIdx]}" and "${this.mainMenu[mainIdx]}" will be deleivered to ${address} at ${time}`
    );
  },
  // orderPasta: function (ing1, ing2, ing3) {
  //   console.log(`Your pasta with ${ing1} ${ing2} ${ing3}`);
  // },
  orderPasta: function (arr) {
    console.log(`Your pasta with`, ...arr);
  },
};

// //####destructing arrays
// // const [a, b] = restaurant.categories;
// // const [c, , d] = restaurant.categories;
// // console.log(a, b);
// // console.log(c, d);

// //####switching variables && Mutating variables
// let [main, sec] = restaurant.categories;
// console.log(main, sec);
// //swaping with temp
// const temp = main;
// main = sec;
// sec = temp;
// console.log(main, sec);
// //simple solution
// [main, sec] = [sec, main];
// console.log(main, sec);

// //####return multiple values from a func.
// console.log(restaurant.order(2, 0));
// const [str, mainCourse] = restaurant.order(2, 0);
// console.log(str, mainCourse);

// //####destructing nested array & default values
// const nestedArr = [5, 10, [, 20]];
// const [x, , y] = nestedArr;
// console.log(x, y);
// const [i = 50, , [j = 90, k]] = nestedArr;
// console.log(i, j, k);

// // #####destrucing objects
// const { name, openingHours, categories } = restaurant;
// console.log(name, openingHours, categories);
// //renaming retrived data
// const { name: restName, openingHours: hrs, categories: tags } = restaurant;
// console.log(tags, restName, hrs);
// //defaults values
// const { menu = {}, starterMenu: startrs = [] } = restaurant;
// console.log(menu, startrs);

// //####Mutating variables
// let a = 111;
// let b = 999;
// const obj = { a: 23, b: 7, c: 14 };
// ({ a, b } = obj); //if not wrapped with pranteths JS thru error
// console.log(a, b);

// //Nested objects
// const { fri } = restaurant.openingHours;
// console.log(fri);

// const {
//   fri: { open, close },
// } = restaurant.openingHours;
// console.log(open, close);

// const {
//   fri: { open: o, close: c },
// } = restaurant.openingHours;
// console.log(o, c);

// console.log(restaurant.location);
// console.log(restaurant['location']); //generating error
// const { location: lo } = restaurant;
// console.log(lo);

// restaurant.orderDeleivery({
//   // time: '22 Hrs.',
//   address: 'Via del sole, 21',
//   mainIdx: 2,
//   strIdx: 2,
// });

//######## Destructing using Spread & Reast pattern
// //#### SPREAD ARRAY: creating new array by expanding exiting array and add new elem
// //Spread on the right side of = called spread cuz it spread all ele
// const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
// console.log(menu);

// const arr1 = [1, 2, 3];
// const arr2 = [4, 5, 6];
// console.log([1, 2, 3, arr2[0], arr2[1], arr2[2]]); // old JS
// const arr3 = [...arr1, ...arr2]; //New JS
// console.log(arr3);
// console.log(...arr3);

// const str = 'Abood';
// const letters = [...str, ' ', 'Junior.'];
// const [...s] = letters;
// console.log(letters);
// console.log(s);
// console.log(...str);
// // console.log(`${...str}`) will not work as string temp not expecting iterable

//send a single object as argument and spread over
// inside the function
// 1)
// let ingred = [prompt('chose ing'), prompt('chose ing'), prompt('chose ing')];
// restaurant.orderPasta(...ingred);
// 2)
// console.log(
//   restaurant.orderPasta([
//     prompt('chose ing'),
//     prompt('chose ing'),
//     prompt('chose ing'),
//   ])
// );

// //Rest on the left side of = called rest cuz it groups rest of the ele
// const [, ...restitems] = [...restaurant.starterMenu, ...restaurant.mainMenu];
// console.log(restitems);

// //resting objects
// const { sat, ...wekdays } = restaurant.openingHours;
// console.log(wekdays);

//#####2 Functions with Spreadt & Reast
const add = function (...nums) {
  //Rest Parameters to pack all in array
  let sum = 0;
  for (var i = 0; i < nums.length; i++) sum += nums[i];
  return sum;
};
const array = [2, 3];
// const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(add(2, 3));
console.log(add(...array)); //Spread arguments to unpack all values

//######Short Circuting
// a = 1;
// b = 0;
// let c = '';
// console.log(a > 0 && b > 0);
// console.log(a > b || c == '');
// a && console.log(a);
// b && console.log(b);

// a || b || c || console.log(a);
// b || c || console.log(b);

//#####Nulshing Coalescing
console.log(restaurant.menu ?? restaurant.name);

//######Optional Chaining
//Old style
if (restaurant.openingHours && restaurant.openingHours.mon)
  console.log(restaurant.openingHours.mon.open);
//New ecma 2020
console.log(restaurant.openingHours?.sat.open);
console.log(restaurant.openingHours?.fri?.close);

const days = ['sat', 'sun', 'mon', 'tus', 'wed', 'thu', 'fri'];
for (const day of days) {
  const open = restaurant.openingHours[day]?.open ?? 'closed';
  console.log(`on ${day}, we open at ${open}`);
}

console.log(restaurant.order?.(0, 1) ?? 'Method does not exust');
console.log(restaurant.orderRisote?.(0, 1) ?? 'Method does not exust');

// const users = [{ name: 'Abood', email: 'hello@world.com' }];
const users = [];
console.log(users[0]?.name ?? 'array not exist');

// //#### FOR OF LOOP : NEW ECMA 6
// //OLd style
// for (var item of allPlayers.entries()) console.log(`${item[0] + 1}:${item[1]}`);
// //folllowing ECMA 6
// for (var [i, el] of allPlayers.entries()) console.log(`${i + 1}:${el}`);
// // console.log(allPlayers.entries());
// // console.log(...allPlayers.entries());

// #### STRINGS ####
//##############String Methods Practice###########3
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)

console.time('codesUp');
for (const item of flights.split('+')) {
  const wordArr = item.match(/[^_;]+/g);
  const prefix =
    wordArr[0] === 'Delayed' ? '🔴' + wordArr[0] + '' + wordArr[1] : wordArr[1];
  const [from, to] = item.match(/([a-z]+)[0-9]+/g);
  const time = wordArr[wordArr.length - 1].replace(':', 'h');
  console.log(
    `${prefix} From ${from.slice(0, 3).toUpperCase()} to ${to
      .slice(0, 3)
      .toUpperCase()} (${time})`.padStart(44)
  );
}
console.timeEnd('codesUp');

console.time('codesUp');
const flGetCode = str => str.slice(0, 3).toUpperCase();

const flType = function (str) {
  const fl = str.replaceAll('_', ' ').trim();
  return fl.startsWith('Delayed') ? '🔴 ' + fl : fl;
};

function flightFormat(flight) {
  for (const flight of flights.split('+')) {
    const [flightType, from, to, time] = flight.match(/[^;]+/g);
    console.log(
      `${flType(flightType)} from ${flGetCode(from)} to ${flGetCode(
        to
      )} ${time.replace(':', 'h')}`.padStart(44)
    );
  }
}

flightFormat(flights);
console.timeEnd('codesUp');

// ############SETs & MAPs ###################
const falsySet = new Set(['bolean', 'undifiend', 0, 'null', 0, 'null']);
// falsySet.add();
// falsySet.add('');
console.log(falsySet);

const mySet = new Set('hello world');
console.log(mySet);
console.log(mySet.size);
console.log(mySet.has('h'));
console.log(falsySet.has('null'));
console.log(falsySet.add('true'));
console.log(mySet.delete('o'));
console.log(mySet);
console.log(falsySet.has('null'));
console.log(falsySet.clear());
for (const i of falsySet) console.log(i);

const staff = ['waiter', 'chief', 'manager', 'chief', 'waiter'];
console.log(staff);
const uniqueStaff = [...new Set(staff)]; //convert to uniqe array
console.log(uniqueStaff);
console.log(new Set(staff).size); //couunting poisitons without creating set
console.log(new Set('heloojss').size); //couunting poisitons without creating set

console.clear();
// ##############--Maps

const rest = new Map();
rest.set('name', 'home burger');
rest.set(1, 'AUH');
rest.set(2, 'DXB');
console.log(rest.set(3, 'AJM'));

console.log(
  rest
    .set('categories', ['burger', 'susage', 'beverges'])
    .set('open', 9)
    .set('close', 23)
    .set(true, 'we are open')
    .set(false, 'we are close')
);
const time = 8;
console.log(rest.get(time > rest.get('open') && time < rest.get('close')));

console.log(rest.has('categories'));
rest.delete(3);
console.log(rest.size);
// console.log

const arr = [1, 2];
rest.set(arr, 'test');
console.log(rest.get([1, 2]));
console.log(rest.get(arr));
rest.set(document.querySelector('h2'), 'heading');
console.log(rest);

console.clear();

//Creating Map out of objects
console.log(Object.entries(openingHours));
console.log(new Map(Object.entries(openingHours)));

const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct 🎉'],
  [false, 'Try again!'],
]);
console.log(question);
console.log(question.get('question'));
//object ont an iterable BUT MAP is
//we can iterate over object using Object.Entries()
for (const [q, v] of question) {
  if (typeof q === 'number') console.log(`${q} : ${v}`);
}
const answer = 3; //prompt('Pick Answer:');
console.log(question.get(Number(answer) === question.get('correct')));

//convert map to array
console.log([...question]);
console.log(question.entries());
console.log([...question.keys()]);
console.log([...question.values()]);
