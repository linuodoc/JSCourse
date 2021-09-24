'use strict';

////////////////////////////////////////////
//////////////Getters() & Setters/////////////////////////////
class Accounts {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.movs = [];
    this.pin = pin;
    this.locale = navigator.language;
    console.log(`Thanks for Opening Account, ${owner}!`);
  }
  set latest(mv) {
    this.movs.push(mv);
  }
  get latest() {
    return this.movs.slice(-1).pop();
  }
  //puplic interface to objects
  deposit(val) {
    this.movs.push(val);
  }
  withdrawl(val) {
    this.deposit(-val);
  }
  loanApproval(val) {
    return true;
  }
  requestLoan(val) {
    if (this.loanApproval(val)) this.deposit(val);
    console.log('Loan Approved');
  }
}

const acct1 = new Accounts('Mo Ziedan', 'USD', 1111);
acct1.deposit(200);
acct1.requestLoan(1000);
// acct1.loanApproval(1000)
//calling the getter
console.log(acct1.latest);
//calling the setter
acct1.latest = 900;
console.log(acct1.latest);
