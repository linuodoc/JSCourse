// Coding Challenge #1

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
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

document.querySelector('body').addEventListener('keyup', function (e) {
  if (e.key === 'u') benz.accelerate();
  if (e.key === 'd') benz.brake();
});

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
  };

  brake = function () {
    this.speed -= 5;
    console.log(`${this.make} now Going at ${this.speed} km/hr`);
  };
}

const ford = new CarCl('Ford', 120);
console.log('getter speed in US Miles', ford.speedUS); //Getter convert to Miles
ford.accelerate();
ford.brake();
ford.speedUS = 120; //setter convert to KM and stored
console.log('getter speed in US Miles', ford.speedUS); //Again getter converted to Miles
console.log(ford);
