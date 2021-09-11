'use strict';

//Function construction
// 1- {} empty object created
// 2- fucntion called and this = {}
// 3- {} linked to prototype
// 4- function auto return {}

const Person = function (fName, bYear) {
  this.fName = fName;
  this.bYear = bYear;

  //bad practice of definign a method
  //   this.calcAge = function () {
  //     const age = 2037 - this.bYear;
  //     return age;
  //   };
};

Person.prototype.calcAge = function () {
  const age = 2037 - this.bYear;
  return age;
};

// 1- {} empty object created
// 2- fucntion called and this = {}
// 3- {} linked to prototype
// 4- function auto return {}
const abood = new Person('abood', 2016);
const hamood = new Person('hamod', 2017);
console.log(abood, hamood);
console.log(hamood.calcAge());
console.log(abood.__proto__);
console.log(abood.__proto__ === Person.prototype);
console.log(Person.prototype.isPrototypeOf(abood));
console.log(Person.prototype.isPrototypeOf(hamood));
console.log(Person.prototype.isPrototypeOf(Person));
