'use strict';

/////////////////Object.Create()//////////////////////
const PersonObj = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },
  init(fname, birthyear) {
    this.fname = fname;
    this.birthYear = birthyear;
  },
};
const father = Object.create(PersonObj);
console.log(father);
father.birthYear = 1983;
father.calcAge();
console.log(father.__proto__ === PersonObj);

const sarah = Object.create(PersonObj);
console.log(sarah);
sarah.init('sarah', 1979);
sarah.calcAge();

//##############Object.Create()  Inheritance
const Childs = Object.create(PersonObj);
const abood = Object.create(Childs);

Childs.init = function (fname, birthyear, gender) {
  PersonObj.init.call(this, fname, birthyear);
  this.gender = gender;
};

Childs.introYourSelf = function () {
  console.log(
    `My name is ${this.name} and i am ${this.age} year's old ${this.gender}`
  );
};
// console.dir(Childs.prototype.constructor);
console.log(abood.__proto__);
console.log(abood.__proto__.__proto__);
console.log(abood.__proto__.__proto__.__proto__);
console.log(abood.__proto__.__proto__.__proto__.__proto__);
abood.init('abood', 2016, 'Boy');
abood.introYourSelf();
abood.calcAge();
