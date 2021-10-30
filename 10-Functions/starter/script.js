'use strict';

//Default Parameters
const bookings = [];
const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  //ES5 price = price || 199

  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};
createBooking('LH23');
createBooking('LH23', undefined, 800);
createBooking('LH23', 2);

console.clear();
//###########Passing Argu (Value vs Ref)###########
const flight = 'LK234'; //primitive
const abood = {
  //object
  name: 'abood',
  passport: 12364646,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr. ' + passenger.name;
  passenger.passport === 12364646
    ? alert('Checked In')
    : alert('Worng passport');
};

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 10000000000);
};

//function will recieve a copy of the primitve value
// const flightNum = flight;
//but it will receive a ref of memory heap of the passed object
//so changes will reflect to that object
// const passenger = abood;

// newPassport(abood);
// console.log(abood.passport);
// console.log(abood);

// checkIn(flight, abood);
// console.log(flight);
// console.log(abood);
console.clear();

//###########FIRST CLASS & HIGH ORDER FUNCTIONS

const onWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

const transformer = function (str, fn) {
  console.log(`Original String: ${str}`);
  console.log(`Transformed String: ${fn(str)}`);

  console.log(`Transfomred by:${fn.name}`);
};

transformer('JavaScript is the best!', upperFirstWord);
transformer('JavaScript is the best!', onWord);

const greethi = () => console.log('👏');
document.body.addEventListener('click', greethi);

document.body.append(document.createElement('div'));
// document.body.append(document.createElement('button'));

const hi5 = function () {
  document.body.addEventListener('click', function () {
    document.querySelector('div').textContent = 'hello 👏';
  });
};

['ola', 'salam', 'hi'].forEach(hi5);

console.clear();
//####### Function Return Function

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greeterHey = greet('Yelp');
greeterHey('JavaScript');
greeterHey('Abood');
greet('Hello')('Abood!');

const greeter = greetMsg => {
  return myName => console.log(`${greetMsg} ${myName}`);
};
// const greeter = greetMsg => myName => console.log(`${greetMsg} ${myName}`);
console.log('###############');
const testGreeter = greeter('Ola');
testGreeter('Mamita');
greeter('Bonjour')('Don. Nabil');

console.clear();

//###################.call() .apply() .bind()
const lufthansa = {
  airline: 'Lufthansa',
  iatacode: 'LH',
  bookings: [],
  //book: function(){}
  book(flightNum = 999, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iatacode} ${flightNum}}`
    );
    this.bookings.push({ flight: `${this.iatacode}${flightNum}`, name });
  },
};

lufthansa.book(239, 'Abood Mohamed');
lufthansa.book(635, 'Hamood Mohamed');
console.log(lufthansa.bookings);

const euroWings = {
  airline: 'Eurowings',
  iatacode: 'EW',
  bookings: [],
};

// the below function is a copy of the method .book()
// hence its a regular func with no This keywors
const book = lufthansa.book;
// book(23, 'Sarah Conor'); //error
// console.log(book);

book.call(euroWings, undefined, 'Mohammed Nabil');
book.call(lufthansa, 303, 'Abood Nabil');

const flightData = [583, 'Nabil Zidan'];
book.apply(euroWings, flightData); //with apply have to pass arr of args
console.log(euroWings);
book.call(lufthansa, ...flightData); //with call only spready over is enough
console.log(lufthansa);

const bookEW = book.bind(euroWings);
console.log(bookEW(100, 'Steve Jobs'));

const bookLH = book.bind(lufthansa, 23); //default parameter with bind
console.log(bookLH('Abood Nabil'));

// this keyword behaviuer
lufthansa.planes = 30;
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};

lufthansa.buyPlane();
//this keyword will be called by eventhandler hence its point to
//to fix the issue we need to bind the func to the object need to work on
//in this case we need to work on (planes prop of lufthansa object)
document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

console.clear();
//###############
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 100));

//default paramter rate
const addVat = addTax.bind(null, 0.23); //null instead of this keyword
console.log(addVat(100));

//func retrun func with Arrow implementation
{
  const TaxAdd = value => rate => console.log(`${value + value * rate}`);
  TaxAdd(100)(0.1);
}

//func retrun func with func expression implementation
{
  const TaxAdd = function (rate = 0.1) {
    return function (value) {
      console.log(`${value + value * rate}`);
    };
  };
  const addRate = TaxAdd(0.23);
  addRate(100); // then call addRate with 'value'
  TaxAdd()(100); //call with value & pass null as rate to pick the default set value
  TaxAdd(0.23)(100); //call with both rate & value
}

console.clear();
