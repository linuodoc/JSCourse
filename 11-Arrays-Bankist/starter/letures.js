/////////////////////////////////////////////////
//////////////////////////////}///////////////////
// LECTURES
const euroToUsd = 1.1;
//Map
const mapNewArr = account1.movements.map(v => v * euroToUsd);
// console.log(mapNewArr);

//Filtter
const withdrawals = account1.movements.filter(v => v < 0);
// console.log(WITHDRAWAL);

let d = [];
let w = [];
account1.movements.filter(v => (v > 0 ? d.push(v) : w.push(v)));
// console.log('DEPOSIT', d);
// console.log('WITHDRAWAL', w);

//Fillter && MAP
const filterMapArr = account1.movements
  .filter(v => v > 0)
  .map(e => e * euroToUsd);
// console.log(account1.movements);
// console.log(filterMapArr);

//REDUCE METHOD
//reduce((previousValue, currentValue, currentIndex, array) => { ... }, initialValue)
// reduce(callbackFn, initialValue)
// GET SUM OF ARRAY WITH REDUCE
const balance = account1.movements.reduce((acc, cr, i, arr) => {
  // console.log(`Iteration ${i + 1}:${acc}`);
  return acc + cr;
}, 0); // 0 initialValue for the accumulator
// console.log(balance);

// GET MAX OF ARRAY WITH REDUCE
const checkMax = account1.movements.reduce((acc, cr, i, arr) => {
  // console.log('array', arr);
  // console.log('idx', i);
  // console.log('accumulator', acc);
  // console.log('current', cr);
  if (acc > cr) return acc;
  else return cr;
}, account1.movements[0]);
// console.log('Max Value:', checkMax);

//############Implementing FIND with For of & .filter
const account = accounts.find((act, i, arr) => act.owner === 'Sarah Smith');
// console.log(account);

const fil = accounts.filter((act, i, arr) => act.owner === 'Sarah Smith');
// console.log(fil[0].owner);

const findOwner = function (actArr, owner) {
  for (const act of accounts) {
    act.owner === 'Sarah Smith' &&
      console.log(`${act.owner} UserName: ${act.userName}`);
  }
};
// findOwner(accounts, 'Sarah Smith');

//Shallow Object Copy##############
// console.log(Object.assign({}, ...fil));
// console.log({ ...fil[0] });

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// /////////////////////////////////////////////////

// let arr = ['d', 'b', 'a', 'd', 'e', 'j', 'a'];
// console.log(arr.slice(2));
// console.log(arr.slice(2, 4));
// console.log(arr.slice(-2));
// console.log(arr.slice(1, -1));

// for (const [i, v] of arr.entries()) {
//   if (v === 'a') {
//     console.log(`Found (${v}) @ idx-${i} Then Break`);
//     break;
//   }
// }

// for (const [i, v] of arr.entries()) {
//   if (v === 'a') {
//     console.log(`Found (${v}) @ idx-${i} Then Continue`);
//     continue;
//   }
// }

// try {
//   arr.forEach((element, idx) => {
//     if (element === 'a') {
//       console.log(`Found (${element}) @ idx-${idx}`);
//       throw 'break out loop';
//     }
//   });
// } catch (e) {
//   console.log(e);
// }

// console.log('-------');
// movements.forEach(function (idx, mov) {
//   if (mov > 0) console.log(`Movement ${idx + 1}: You Deposited ${mov}`);
// });

// console.log('--correct order of fun parameters is vital!!----');
// movements.forEach(function (mov, idx) {
//   if (mov > 0) console.log(`Movement ${idx + 1}: You Deposited ${mov}`);
// });

//Array FLAT
arr = [[1, 2], [4, 5], 2, 3, 4].flat();
// console.log(arr);
arry = [[1, 2], [4, 5, [6, 7]], 2, 3, 4].flat(2);
// console.log(arry);

//Array Flat with Map
const acctMov = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((sum, cr) => sum + cr, 0);
// console.log(acctMov);

// Array flatMap not working with deep netsed array
const accMov1 = accounts
  .flatMap(acc => acc.movements)
  .reduce((sum, cr) => sum + cr, 0);
// console.log(accMov1);

const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
// console.log('Original Order', owners);
// console.log(owners.sort());

//Numbers
const movements = [200, -200, 340, -300, -20, 50, 400, -460];
// console.log(movements);
// console.log(movements.sort());

// If compareFunction(a, b) returns a value > than 0, sort b before a.
// If compareFunction(a, b) returns a value < than 0, sort a before b.
// If compareFunction(a, b) returns 0, a and b are considered equal
const ascending = movements.sort((a, b) => {
  if (a > b) return 1;
  if (a < b) return -1;
});
// console.log('Ascending>>', ascending);

const descending = movements.sort((a, b) => {
  if (a > b) return -1;
  if (a < b) return 1;
});
// console.log('Descending>>', descending);

// console.log(movements.sort((a, b) => a - b));
// console.log(movements.sort((a, b) => b - a));

//Array.fill() && Array.from()
arr = [1, 2, 3, 4, 5, 6, 7];
// console.log(arr.fill(10, -1));
// console.log(arr.fill(10, -2, -1));

arr2 = new Array(7).fill(10);
// console.log(arr2);

arr3 = Array.from(arr);
// console.log(arr3);

arr4 = Array.from({ length: 7 }, e => (e = 9));
// console.log(arr4);

// let arr = document.querySelectorAll('.movements__value');
// console.log(arr);

// test.addEventListener('click', function () {
//   let arr = Array.from(document.querySelectorAll('.movements__value'));
//   console.log(arr.map(el => el.textContent.replace('€', '')));
// });

// Testing how to convert array alike structure to array using Array.from()
const test = document.querySelector('.balance__value');
test.addEventListener('click', function () {
  let arr = Array.from(document.querySelectorAll('.movements__value'), el =>
    el.textContent.replace('€', '')
  );
  console.log(arr);
});

//##########Arrays Practice 1:
const overAllBalance = accounts
  .flatMap((cr, i, arr) => cr.movements)
  .filter(cr => cr > 0)
  .reduce((sum, cr, i, arr) => sum + cr, 0);
// console.log(overAllBalance);

//##########Arrays Practice 2:
dice = Array.from(
  { length: 30 },
  cr => (cr = Math.trunc(Math.random() * 6) + 1)
);
// console.log(dice);

//##########Arrays Practice 3:
const numOfDeposits = accounts
  .flatMap(cr => cr.movements)
  .filter(cr => cr >= 1000).length;
// console.log(numOfDeposits);

const numDeposits = accounts
  .flatMap(cr => cr.movements)
  .reduce((accumlator, cr) => (cr >= 1000 ? ++accumlator : accumlator), 0);
// console.log(numDeposits);
// let dubai = 10;
// console.log(dubai++);
// console.log(++dubai);

//##########Arrays Practice 4:
//sum of all deposits && sum of all withdrawals all in one Go using Reducer
let x = {};
accounts
  .flatMap(cr => cr.movements)
  .reduce((sum, cr, i, arr) => {
    cr > 0
      ? (x.dSum = arr.filter(cr => cr > 0).reduce((sum, cr) => sum + cr))
      : (x.wSum = arr.filter(cr => cr < 0).reduce((sum, cr) => sum + cr));
  }, 0);
// console.log(x);

// const { desposit, withdrawal } = accounts
//   .flatMap(cr => cr.movements)
//   .reduce(
//     (sum, cr) => {
//       // cr > 0 ? (sum.desposit += cr) : (sum.withdrawal += cr);
//       sum[cr > 0 ? 'desposit' : 'withdrawal'] += cr; //AMAZING
//       return sum;
//     },
//     { desposit: 0, withdrawal: 0 } // accumulator could be anything !!!!!
//   );
// console.log(desposit, withdrawal);

const [desposit, withdrawal] = accounts
  .flatMap(cr => cr.movements)
  .reduce((sum, cr) => {
    cr > 0 ? (sum[0] += cr) : (sum[1] += cr);
    return sum;
  }, (sum = [0, 0])); // accumulator could be anything !!!!!

// console.log(desposit, withdrawal);

//##########Arrays Practice 5 : GET MAX OF ARRAY WITH REDUCE
const Max = account1.movements.reduce((acc, cr, i, arr) => {
  // console.log('array', arr);
  // console.log('idx', i)
  // console.log('accumulator', acc);
  // console.log('current', cr);
  if (acc > cr) return acc;
  else return cr;
}, account1.movements[0]);
// console.log('Max Value:', Max);

//##########Arrays Practice 6 : Title Case Conversion
/**
 Lowercase only minor words that are three letters or fewer in a title or heading (except the first word in a title or subtitle or the first word after a colon, em dash, or end punctuation in a heading):*/

str =
  'Lowercase only minor words in the exception array below that are three letters or fewer in a title or heading (except the first word in a title or subtitle or the first word after a colon, em dash, or end punctuation in a heading';

const titleCaseConversion = function (title) {
  const captalization = str => str[0].toUpperCase() + str.slice(1);
  const words =
    '“and,” “as,” “but,” “for,” “if,” “nor,” “or,” “so,” “yet”,“a,” “an,” “the”,“as,” “at,” “by,” “for,” “in,” “of,” “off,” “on,” “per,” “to,” “up,” “via”';
  const exception = words.match(/[a-zA-Z]+/g);
  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exception.includes(word) ? word : captalization(word)))
    .join(' ');
  return captalization(titleCase);
};
// console.log(titleCaseConversion(str));

console.log(Number.MAX_SAFE_INTEGER);
console.log(2 ** 53 + 20);
console.log(typeof 12646546546578789295959598784654153156487n);
console.log(typeof BigInt(126465465465787892959595987846541531584));
console.log(10 ** 100);

const future = new Date(2027, 0, 10, 23, 15, 10);
console.log(future);

const testdate = Date.now();
console.log(new Date(testdate).toISOString());

// setInterval(() => {
//   const now = new Date();
//   console.log(`${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`);
// }, 1000);
