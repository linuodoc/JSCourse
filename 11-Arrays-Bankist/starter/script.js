'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2021-09-04T17:01:17.194Z',
    '2021-09-05T23:36:17.929Z',
    '2021-09-08T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

// const account3 = {
//   owner: 'Steven Thomas Williams',
//   movements: [200, -200, 340, -300, -20, 50, 400, -460],
//   interestRate: 0.7,
//   pin: 3333,
// };

// const account4 = {
//   owner: 'Sarah Smith',
//   movements: [430, 1000, 700, 50, 90],
//   interestRate: 1,
//   pin: 4444,
// };

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

//GLOBAL VARIABLES to hold data to be used across functions/methods
let currentAccount, timer;
const accounts = [account1, account2];
// const accounts = [account1, account2, account3, account4];

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
const updateAppUi = function (currentAccount) {
  calDispalyBalance(currentAccount);
  displayMovements(currentAccount);
  calDisplayStatistics(currentAccount);
};

//#################FUN- UPDATE LOGIN TIMESTAMP AND MOVEMENTS TIMESTAMP
// const dateFormater = (date, locale, intel=false) => {
// if (!intel){
//   const mins = `${date.getMinutes()}`.padStart(2, 0);
//   const hours = `${date.getHours()}`.padStart(2, 0);
//   const day = `${date.getDate()}`.padStart(2, 0);
//   const month = `${date.getMonth() + 1}`.padStart(2, 0);
//   const year = date.getFullYear();
//   const dateFormatted = `${day}/${month}/${year} ${hours}:${mins}`;
// }
//   let daysPassed = 0;
//   const calcDaysPassed = date => {
//     const daysPassed = Math.round(
//       Math.abs(date - new Date()) / (1000 * 60 * 60 * 24)
//     );
//     if (daysPassed === 0) return 'Today';
//     if (daysPassed === 1) return 'Yesterday';
//     if (daysPassed <= 7) return `${daysPassed} days ago`;
//     if (daysPassed > 7) return `${dateFormatted}`;
//   };
//   daysPassed = calcDaysPassed(date);

//   return [daysPassed, dateFormatted];
// };

const movDateFormater = function (date, accountlocale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  return new Intl.DateTimeFormat(accountlocale).format(date);
};

const currentDateFormater = dateNow => {
  //account.locale OR navigator.language
  // Create current date and time
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    // weekday: 'long',
  };
  // const locale = navigator.language;
  labelDate.textContent = new Intl.DateTimeFormat(
    currentAccount.locale,
    options
  ).format(dateNow);
};

//#################FUN- TO FORMAT NUMBER
const currencyFormater = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

//#################FUN- TO DISPLAY TRANSACTIONS && UPDATE APP UI (insertAdjacentHTML)#################
const displayMovements = function (account, sort = false) {
  containerMovements.innerHTML = ''; // adding TEXT & HTML elements
  // containerMovements.textContent = ''; // setting text
  // console.log(containerMovements.innerHTML); //return all html + text
  // console.log(containerMovements.textContent); //return all text only
  const movs = sort
    ? account.movements.slice().sort((a, b) => a - b)
    : account.movements;

  movs.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const movDate = new Date(account.movementsDates[i]);
    const displayDate = movDateFormater(movDate, account.locale);
    const numberFormat = currencyFormater(
      mov,
      account.locale,
      account.currency
    );
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
    <div class="movements__date">${displayDate}</div>
      <div class="movements__value">${numberFormat}</div>
      
    </div>
    `;
    // attach html into containers
    containerMovements.insertAdjacentHTML('afterbegin', html);
    // containerMovements.innerHTML(html);
  });
  [...document.querySelectorAll('.movements__row')].forEach((row, i) => {
    if (i % 2 === 0) row.style.backgroundColor = 'rgb(254, 255, 238)';
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
  labelSumIn.textContent = currencyFormater(
    movIn,
    account.locale,
    account.currency
  );

  const movOut = movements
    .filter((mov, i, arr) => mov < 0)
    .reduce((sum, cr, i, arr) => sum + cr, 0);
  // console.log(movOut);
  labelSumOut.textContent = currencyFormater(
    Math.abs(movOut),
    account.locale,
    account.currency
  );

  const interest = movements
    .filter((mov, i, arr) => mov > 0)
    .map((int, i, arr) => (int * iR) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((sum, cr, i, arr) => sum + cr);
  labelSumInterest.textContent = currencyFormater(
    interest,
    account.locale,
    account.currency
  );
};

//#################FUN- TO UPDATE ACCOUNT BALANCE###############
const calDispalyBalance = function (account) {
  account.balance = account.movements.reduce((sum, el, i, arr) => {
    // console.log(`Iteration ${i + 1}:${sum}`);
    return sum + el;
  }, 0); // 0 initialValue for the accumulator " sum "
  labelBalance.textContent = currencyFormater(
    account.balance,
    account.locale,
    account.currency
  );

  // return balance;
};
//#################FUN- TIMER ###############
const logOutTimer = function () {
  // Set time to 5 minutes
  let time = 60;
  const ticker = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    labelTimer.textContent = `${min}:${sec}`;
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }
    time--;
  };

  // Call the timer every second
  ticker(); // called first time cuz setInterval wait 1 sec before calling callback fn
  const timer = setInterval(ticker, 1000);
  return timer; //global variable to be check betn logged users
};

//#####################EVENT HANDLERS######################

//###########EVENT - IMPLEMENT USER LOGIN & APP UI UPDATE/DISPLAY

//FAKE Always loggedin with account1
// let currentAccount = accounts[0];
// containerApp.style.opacity = 100;
// updateAppUi(currentAccount);

btnLogin.addEventListener('click', function (e) {
  //prevent form from submitting
  e.preventDefault();

  //validate login credentials
  currentAccount = accounts.find(
    (act, i, arr) => act.userName === inputLoginUsername.value
  );
  //optional chain to check undefined
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //Display Message
    labelWelcome.textContent = `Welcome Back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    //Display App UI
    containerApp.style.opacity = 100;

    // Create current date and time
    currentDateFormater(new Date());

    //UPDate APP UI
    updateAppUi(currentAccount);

    //start logOutTimer
    //check if timer exists to kill it before start new one
    if (timer) clearInterval(timer);
    timer = logOutTimer();

    //lose focus and clear on input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
  }
});

//###########EVENT - TO ENABLE ACCOUNT TRANSACTION/TRANSFER
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  let amount = Number(inputTransferAmount.value);
  let reciverAccount = accounts.find(
    act => act.userName === inputTransferTo.value
  );
  //Condition must be True To-Do transfer
  if (
    amount > 0 &&
    reciverAccount &&
    currentAccount.balance >= amount &&
    reciverAccount?.userName !== currentAccount.userName
  ) {
    //Do Transfer
    currentAccount.movements.push(Number(-amount));
    reciverAccount.movements.push(Number(amount));

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    reciverAccount.movementsDates.push(new Date().toISOString());

    //UPDate APP UI
    updateAppUi(currentAccount);
  } else console.log("You don't have suffiecent balance");

  //loose focus & clear input fields
  inputTransferAmount.value = inputTransferTo.value = '';
  inputTransferTo.blur();
});

//###########EVENT - LOAN REQUEST
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  let loanAmount = Number(inputLoanAmount.value);
  if (
    loanAmount > 0 &&
    currentAccount.movements.some(mov => mov > loanAmount * 0.1)
  ) {
    //simulate loan approval time
    setTimeout(() => {
      // Add movement
      currentAccount.movements.push(loanAmount);
      // Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());
      // Update UI
      updateAppUi(currentAccount);
    }, 3000);
  } else console.log('You are not eligable for this amount');

  //loose focus & clear input fields
  inputLoanAmount.value = '';
  inputLoanAmount.blur();
});

//###########EVENT - CLOSING ACCOUNT
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    currentAccount.userName === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const idx = accounts.findIndex(
      account => account.userName === inputCloseUsername.value
    );
    // console.log(idx);
    accounts.splice(idx, 1);
    // console.log(accounts);
    // inputCloseUsername.value = inputClosePin.value = '';
    // inputCloseUsername.blur();
    containerApp.style.opacity = 0;
  }
});
//###########EVENT - SORTING
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

//###########EVENT - RESET LOGOUT TIMER
document.querySelector('body').addEventListener('click', function () {
  clearInterval(timer);
  // console.log('kill timer');
  timer = logOutTimer();
});
