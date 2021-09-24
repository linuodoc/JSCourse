'use strict';

/////////////////ES6 CLasses//////////////////////
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
    console.log(2037 - this.bYear);
  }
  greet() {
    console.log(`Hey ${this.name}👏`);
  }
  get age() {
    return 2037 - this.bYear;
  }
  //Uncaught RangeError: Maximum call stack size exceeded
  //cuz setter is being handled as a property and tryng to access
  //class property which already exists (set fullName) will thru error
  // fullName() && this.fullName so we are usng _fullName
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a fullName`);
  }
  get fullName() {
    return this._fullName;
  }

  //////////////Class Static Methods
  static hey() {
    console.log(`Hello There,i am a class static method`);
  }
}
PersonCl.prototype.greet = function () {
  console.log(`Hi ${this.name}✨`);
};

const aboodM = new PersonCl('aboodM', 1996);
console.log(aboodM);
aboodM.calcAge();
console.log(aboodM.__proto__ === PersonCl.prototype);
aboodM.greet();
//SETTER
aboodM.fullName = 'Abood Mo';
console.log(aboodM);
//GETTER
console.log(aboodM.age);
console.log(aboodM.fullName);
PersonCl.hey();
// aboodM.hey(); //not accessible

//##############Class  Inheritance
class Childs extends PersonCl {
  // if no additional property required no need for the below constructor
  constructor(name, bYear, gender) {
    //always needs to happen first, so to access this keyword
    super(name, bYear); //construction function of parent class
    this.gender = gender;
  }
  introYourSelf() {
    console.log(
      `My name is ${this.name} and i am ${this.age} year's old ${this.gender}`
    );
  }
  calcAge() {
    console.log(`I'm ${2037 - this.bYear} years old`);
  }
}
// const hamood = new Childs('hamood', 2017);
// console.log(hamood);
const hamood = new Childs('hamood', 2017, 'Boy');
console.log(hamood);
hamood.introYourSelf();
hamood.calcAge();
