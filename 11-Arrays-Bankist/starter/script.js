'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//#################FUN- TO GENERATE UID BASED ON ACCOUNT OWNER NAME#################
const createUserName = function (accounts) {
  accounts.forEach(acc => {
    acc.userName = acc.owner //adding new obj prop like acc['userName']
      .toLowerCase()
      .split(' ')
      .map((el, i, arr) => el[0])
      .join('');
  });
};
createUserName(accounts);

//#################FUN- UPDATE APP UI #################
const updateAppUi = function () {
  calDispalyBalance(currenAccount);
  displayMovements(currenAccount.movements);
  calDisplayStatistics(currenAccount);
};

//#################FUN- TO DISPLAY TRANSACTIONS && UPDATE APP UI (insertAdjacentHTML)#################
const displayMovements = function (movements) {
  containerMovements.innerHTML = ''; // adding TEXT & HTML elements
  // containerMovements.textContent = ''; // setting text
  // console.log(containerMovements.innerHTML); //return all html + text
  // console.log(containerMovements.textContent); //return all text only
  movements.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__value">${mov}€</div>
    </div>
    `;
    // attach html into containers
    containerMovements.insertAdjacentHTML('afterbegin', html);
    // containerMovements.innerHTML(html);
  });
};

//#################FUN - TO CALCULATE SUMMARY STATISTICS AND UPDATE APP UI#################
const calDisplayStatistics = function (account) {
  const movements = account.movements;
  const iR = account.interestRate;

  const movIn = movements
    .filter((mov, i, arr) => mov > 0)
    .reduce((sum, cr, i, arr) => sum + cr, 0);
  // console.log(movIn);
  labelSumIn.textContent = `${movIn}€`;

  const movOut = movements
    .filter((mov, i, arr) => mov < 0)
    .reduce((sum, cr, i, arr) => sum + cr, 0);
  // console.log(movOut);
  labelSumOut.textContent = `${Math.abs(movOut)}€`;

  const interest = movements
    .filter((mov, i, arr) => mov > 0)
    .map((int, i, arr) => (int * iR) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((sum, cr, i, arr) => sum + cr);
  labelSumInterest.textContent = `${interest}`;
};

//#################TO UPDATE ACCOUNT BALANCE###############
const calDispalyBalance = function (account) {
  account.balance = account.movements.reduce((sum, el, i, arr) => {
    // console.log(`Iteration ${i + 1}:${sum}`);
    return sum + el;
  }, 0); // 0 initialValue for the accumulator " sum "
  labelBalance.textContent = `${account.balance}€`;
  // return balance;
};

//#################FUN - IMPLEMENT USER LOGIN & APP UI UPDATE/DISPLAY
let currenAccount; //Global variable to be used across functions/methods

btnLogin.addEventListener('click', function (e) {
  //prevent form from submitting
  e.preventDefault();
  //validate login credentials
  currenAccount = accounts.find(
    (act, i, arr) => act.userName === inputLoginUsername.value
  );
  //optional chain to check undefined
  if (currenAccount?.pin === Number(inputLoginPin.value)) {
    //Display Message
    labelWelcome.textContent = `Welcome Back, ${
      currenAccount.owner.split(' ')[0]
    }`;
    //Display App UI
    containerApp.style.opacity = 100;
    //lose focus and clear on input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    //UPDate APP UI
    updateAppUi();
  }
});

//#################FUN - TO ENABLE ACCOUNT TRANSACTION/TRANSFER#################
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  let amount = Number(inputTransferAmount.value);
  let reciverAccount = accounts.find(
    act => act.userName === inputTransferTo.value
  );
  //Conditoin must be True To-Do transfer
  if (
    amount > 0 &&
    reciverAccount &&
    currenAccount.balance >= amount &&
    reciverAccount?.userName !== currenAccount.userName
  ) {
    //Do Transfer
    currenAccount.movements.push(Number(-amount));
    reciverAccount.movements.push(Number(amount));
    //UPDate APP UI
    updateAppUi();
  } else console.log("You don't have suffiecent balance");
  //loose focus & clear input fields
  inputTransferAmount.value = inputTransferTo.value = '';
  inputTransferTo.blur();
});

//#################FUN - LOAN REQUEST#################
// Read the requested amount
// add the amount to current account balance
// update movements with the deposit transactions
// update current account summary
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  inputLoanAmount.textContent = '';
  inputLoanAmount.blur();
  currenAccount.movements.push(Number(inputLoanAmount.value));
  //UPDate APP UI
  updateAppUi();

  //loose focus & clear input fields
  inputLoanAmount.value = '';
  inputLoanAmount.blur();
});
//#################FUN - ENABLE SEESION TIMEOUT#################

//#################FUN - UPDATE LOGIN TIMESTAMP AND MOVEMENTS TIMESTAMP#################

/*
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
*/
