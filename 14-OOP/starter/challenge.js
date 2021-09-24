// Coding Challenge #1

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.
DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h
*/

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} going at ${this.speed} km/hr`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} now Going at ${this.speed} km/hr`);
};

const bmw = new Car('BMW', 120);
const benz = new Car('Mercedes', 95);

// document.querySelector('body').addEVentListener('keyup', function (e) {
//   if (e.key === 'u') benz.accelerate();
//   if (e.key === 'd') benz.brake();
// });
// console.log(bmw.__proto__ === Car.prototype);

/////////////////////////////////////////////////////////////////////
// Coding Challenge #3
/*
1- Use a constructor function to implement an Electric Car (called 'EV') as a child "class" of 'Car'. Besides a make and current speed, the 'EV' also has the current battery charge in % ('charge' property)
2- Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo'
3- Implement an 'accelerate' method that will increase the car's speed by 20,
and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%'

4- Create an electric car object and experiment with calling 'accelerate',
'brake' and 'chargeBattery' (charge to 90%). Notice what happens when
you 'accelerate'! Hint: REView the definiton of polymorphism 😉
Data car 1: 'Tesla' going at 120 km/h, with a charge of 23%
*/
const EV = function (make, speed, charge) {
  // this.make = make;
  // this.speed = speed;
  // this.charge = charge;
  Car.call(this, make, speed);
  this.charge = charge;
};
//////////////////////////////////////////
//linking EV.prototype property : __proto__  >> To Car.prototype
//Object.ceate() create {} and set to this keyword
//hence inhertance should be defined before intiating objects
//also before define any methods othwerise empty object will replace all
EV.prototype = Object.create(Car.prototype);
// console.dir(EV.prototype.constructor); //constructr set to parent constructor func cuz of Object.create()
EV.prototype.constructor = EV; //Point object constructor back to its constructor fun.
// console.dir(EV.prototype.constructor);

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.chargeBattery(this.charge - 1);
  console.log(
    `${this.make} going at ${this.speed} km/hr with a charge of ${this.charge} %`
  );
};

const tesla = new EV('Tesla', 120, 24);
console.log(tesla);
console.log(tesla.__proto__);
console.log(tesla.__proto__.__proto__);
console.log(tesla.__proto__.__proto__.__proto__);
console.log(tesla.__proto__.__proto__.__proto__.__proto__);
console.log(tesla instanceof Car);
console.log(tesla instanceof EV);
tesla.chargeBattery(23);
tesla.brake();
console.log(tesla);
tesla.accelerate(); // tesla object able to access accelarte() from parent class

console.clear();
////////////////////////////////////////////////////
// Coding Challenge #2
/**
 * Your tasks:
1. Re-create Challenge #1, but this time using an ES6 class (call it 'CarCl')
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6)
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6)
4. Create a new car and experiment with the 'accelerate' and 'brake'
methods, and with the getter and setter.
Test data:
§ Data car 1: 'Ford' going at 120 km/h
 */

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }

  accelerate = function () {
    this.speed += 10;
    console.log(`${this.make} going at ${this.speed} km/hr`);
    return this;
  };

  brake = function () {
    this.speed -= 5;
    console.log(`${this.make} now Going at ${this.speed} km/hr`);
    return this;
  };
}

const ford = new CarCl('Ford', 120);
console.log('getter speed in US Miles', ford.speedUS); //Getter convert to Miles
ford.accelerate();
ford.brake();
ford.speedUS = 120; //setter convert to KM and stored
console.log('getter speed in US Miles', ford.speedUS); //Again getter converted to Miles
console.log(ford);

/**
Coding Challenge #4

Your tasks:
1. Re-create Challenge #3, but this time using ES6 classes: create an 'EVCl'
child class of the 'CarCl' class
2. Make the 'charge' property private
3. Implement the ability to chain the 'accelerate' and 'chargeBattery'
methods of this class, and also update the 'brake' method in the 'CarCl'
class. Then experiment with chaining!
Test data:
§ Data car 1: 'Rivian' going at 120 km/h, with a charge of 23%
 */

class EVCL extends CarCl {
  #charge;
  constructor(make, speed, chargeTo) {
    super(make, speed);
    this.#charge = chargeTo;
  }
  chargeBattery = function (chargeTo) {
    this.#charge = chargeTo;
    return this;
  };
  accelerate = function () {
    this.speed += 10;
    console.log(
      `${this.make} going at ${this.speed} km/hr with a charge of ${
        this.#charge
      }%`
    );
    return this;
  };
}

const car1 = new EVCL('Rivian', 120, 23);
console.log(car1);
// car1.accelerate();
car1.accelerate().chargeBattery(10).brake();
console.log(car1);
// console.log(car1.#charge); //not possible
