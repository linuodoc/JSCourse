'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  openingHours: {
    thu: {
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
  },
  order: function (strIdx, mainIdx) {
    return [this.starterMenu[strIdx], this.mainMenu[mainIdx]];
  },
};

//####destructing arrays
// const [a, b] = restaurant.categories;
// const [a, , b] = restaurant.categories;
// console.log(a, b);
// //switching variables
// const [first, second] = [b, a];
// console.log(first, second);
// //return multiple values from a func.
// console.log(restaurant.order(2, 0));
// const [str, mn] = restaurant.order(2, 0);
// console.log(str, mn);
// //destructing nested array & default values
// const nestedArr = [, 10, [, 20]];
// const [i = 50, , [j = 90, k]] = nestedArr;
// console.log(i, j, k);

//#####destrucing objects
// const { name, openingHours, categories } = restaurant;
// console.log(name, openingHours, categories);
// //renaming retrived data
// const { name: restName, openingHours: hrs, categories: tags } = restaurant;
// console.log(tags, restName, hrs);
// //defaults
// const { menu = {}, starterMenu: startrs = [] } = restaurant;
// console.log(menu, startrs);

//####Mutating variables
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };
({ a, b } = obj); //if notg wrapped with pranteths will raise error

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

//creating new array by expanding exiting array and add new elem
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const arr3 = [...arr1, ...arr2];
console.log(arr3);
console.log(...arr3);

let { name: newName } = restaurant;
newName = [...newName, 'valantino'];
console.log(newName);

const str = 'Abood';
const letters = [...str, ' ', 'Junior.'];
console.log(letters);
console.log(...str);
// console.log(`${...str}`) will not work as string temp not expecting and iterable

//Spread on the right side of = called spread cuz it spread all ele
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menu);

//Rest on the left side of = called rest cuz it groups rest of the ele
const [, ...restitems] = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(restitems);

//resting objects

const { sat, ...wekdays } = restaurant.openingHours;
console.log(wekdays);

a = 1;
b = 0;
let c = '';
console.log(a > 0 && b > 0);
console.log(a > b || c == '');
a && console.log(a);
b && console.log(b);

a || b || c || console.log(a);
b || c || console.log(b);
