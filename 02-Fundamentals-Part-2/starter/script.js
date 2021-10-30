"use strict";

// let hasDriversLicense = false;
// const passTest = true;

// if (passTest) hasDriverLicense = true;
// if (hasDriversLicense) console.log("ofcourse you can drive");

// const interface = "audio";
// const private = "bankaccount";
// const if = 'hello';

// let myArray = ["ahmed", "abood"];
// console.log(myArray);

// myArray = ["ali", "moouhamed"];
// console.log(myArray);

const jonas = {
  firstName: "Jonas",
  lastName: "Schmedtmann",
  birthYeah: 1991,
  job: "teacher",
  friends: ["Michael", "Peter", "Steven"],
  hasDriversLicense: true,
  calcAge: function () {
    this.age = 2037 - this.birthYeah;
    return this.age;
  },
  getSummary: function () {
    return `${this.firstName} ${this.calcAge()} years old ${
      this.job
    } and he has ${this.hasDriversLicense ? "a" : "not"} driver license`;
  },
};

console.log(jonas.age);
//jonas has 3 friends and his best friend is Michale
// console.log(
//   `${jonas.firstName} has ${jonas.friends.length} friends and his best friend is ${jonas.friends[0]}`
// );
console.log(jonas);
//jonas is (46) years old (teacher) and he has (a/not) driver licences
console.log(jonas.getSummary());

// console.log(jonas["calcAge"]());
// console.log(jonas.calcAge());
