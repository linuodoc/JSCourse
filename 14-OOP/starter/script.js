'use strict';

////////////////////////////////////////////
///////////////////////////////////////////
//Function construction#####################
const Person = function (fName, bYear) {
  console.log(this);

  //instance properties
  this.fName = fName;
  this.bYear = bYear;

  //bad practice of definign a method like this inside the construction function
  //   this.calcAge = function () {
  //     const age = 2037 - this.bYear;
  //     return age;
  //   };
  //   this.hey = function () {
  //     console.log(`Hey There `);
  //   };
};
//////////////Static Methods/////////////////////////////
Person.hey = function () {
  console.log(`Hey There `);
};
Person.hey();
// new Operator >>
// 1- will create {} empty object
// 2- set the this keyword to the created {}
// 3- link the created object to the prototype
// 4- function auto return {}

const abood = new Person('abood', 2016);
const hamood = new Person('hamod', 2017);
console.log(abood, hamood);
console.log(abood instanceof Person);

// set Methods prototype
console.log(Person.prototype);
// 3- link the created object proto object.__proto__ property to the construction prototype (person)
Person.prototype.calcAge = function () {
  const age = 2037 - this.bYear;
  return age;
};
console.log(hamood.calcAge());
console.log(abood.__proto__);
console.log(abood.__proto__ === Person.prototype);
console.log(Person.prototype.isPrototypeOf(abood));
console.log(Person.prototype.isPrototypeOf(Person));
// Person is prototypeOfLinkedObjects (abood, hamood, etc)

//set properties prototype
Person.prototype.species = ' Homo Sapies';
console.log(abood.species, hamood.species);

// Own Property vs Inherted property
console.log(abood.hasOwnProperty('fName'));
console.log(abood.hasOwnProperty('spiecs'));
console.clear();
// console.dir(Person);
// console.dir(abood.calcAge);

////////////////////////////////////////////
///////////////////////////////////////////
//ES6 CLasses#######################
//NOTES:
//1- classes are not hoisted, cant be  used before declaration
//2- calsses are first class citizen (can be send to func as arg) also can be retruned
//3- always excuted on strict mode

//class expression
// const PersonCl = class {};

//class declaration
class PersonCl {
  constructor(name, bYear) {
    this.name = name;
    this.bYear = bYear;
  }
  //Methods will be added to .prototype property
  calcAge() {
    const age = 2037 - this.bYear;
    return age;
  }
  greet() {
    console.log(`Hey ${this.name}`);
  }
  get age() {
    return 2037 - this.bYear;
  }
  //Uncaught RangeError: Maximum call stack size exceeded
  //cuz setter is being handled as a property and tryng to access
  //class property which already exists (set fullName) will thru error
  // fullName() && this.fullName
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a fullName`);
  }
  get fullName() {
    return this._fullName;
  }
  //////////////Static Methods/////////////////////////////
  static hey() {
    console.log(`Hey There `);
  }
}
// PersonCl.prototype.greet = function () {
//   console.log(`Hey ${this.name}`);
// };

const aboodM = new PersonCl('aboodM', 1996);
console.log(aboodM);
console.log(aboodM.calcAge());
console.log(aboodM.__proto__ === PersonCl.prototype);
aboodM.greet();
console.log(aboodM.age);
aboodM.fullName = 'Abood Mohamed';
console.log(aboodM);
console.log(aboodM.fullName);

PersonCl.hey();
// aboodM.hey();

////////////////////////////////////////////
///////////////////////////////////////////
//Object.Create ()####################
const personProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },
  init(fname, birthyear) {
    this.fname = fname;
    this.birthYear = birthyear;
  },
};
const mohamed = Object.create(personProto);
console.log(mohamed);
mohamed.birthYear = 1983;
mohamed.calcAge();
console.log(mohamed.__proto__ === personProto);

const sarah = Object.create(personProto);
console.log(sarah);
sarah.init('sarah', 1979);
sarah.calcAge();
////////////////////////////////////////////
//////////////Getters() & Setters/////////////////////////////
// const account = {
//   owner: 'jonas',
//   movs: [200, 300, 250, 530],
//   get latest() {
//     return this.movs.slice(-1).pop();
//   },
//   set latest(mv) {
//     this.movs.push(mv);
//   },
// };
// //calling the getter
// console.log(account.latest);
// //calling the setter
// account.latest = 900;
// console.log(account.latest);
////////////////////////////////////////////
