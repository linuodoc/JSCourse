'use strict';
//////////////Function construction///////////////////////
//Notes:
//1- new keyword will create empty object
//2- setting this keyword to the empty object this >> {}
//3- set the prototype of the created object to construction.prototype
//4- return the object automatically

const PersonProto = function (fName, bYear) {
  // console.log(this);
  //instance properties
  this.fName = fName;
  this.bYear = bYear;
};
//////////////Static Methods
PersonProto.hey = function () {
  console.log(`###############Hey There `);
};
//////////////Prototype Method
PersonProto.prototype.calcAge = function () {
  const age = 2037 - this.bYear;
  return age;
};
//////////////set properties prototype
PersonProto.prototype.species = ' Homo Sapies';

//////////////Constrution Function Inheritance & linking prototypes
const Childs = function (fname, byear, gender) {
  PersonProto.call(this, fname, byear);
  this.gender;
};
Childs.prototype = Object.create(PersonProto.prototype);
Childs.prototype.constructor = Childs;
console.dir(Childs.prototype.constructor);

const father = new PersonProto('Mo Nabil', 1983);
const abood = new Childs('Abood Mo', 2016, 'Boy');
console.log(father);
console.log(abood);
console.log(abood.species);
console.log(abood.calcAge());
console.log(abood.__proto__);
console.log(abood.__proto__.__proto__);
console.log(abood.__proto__.__proto__.__proto__);
console.log(abood.__proto__.__proto__.__proto__.__proto__);
console.log(abood.__proto__ === PersonProto.prototype);
console.log(abood.__proto__ === Childs.prototype);
console.log(father instanceof PersonProto);
console.log(abood instanceof PersonProto);
console.log(abood instanceof Childs);
console.log(PersonProto.prototype.isPrototypeOf(abood));
console.log(Childs.prototype.isPrototypeOf(abood));
console.log(PersonProto.prototype.isPrototypeOf(father));
// Own Property vs Inherted property
console.log(abood.hasOwnProperty('fName'));
console.log(abood.hasOwnProperty('spiecs'));
PersonProto.hey();
// console.clear();
