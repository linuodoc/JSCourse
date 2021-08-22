// let bill = 275;
// let totBill;

// if (bill >= 50 && bill <= 300) {
//   console.log(`${bill}, is between 50 & 350, hence only 15% Tip added`);
//   let tip = (15 * bill) / 100;
//   totBill = bill + tip;
//   console.log(bill, tip, totBill);
// } else {
//   console.log(`${bill}, is more than 350, hence 20% Tip added`);
//   let tip = (20 * bill) / 100;
//   totBill = bill + tip;
//   console.log(bill, tip, totBill);
// }

// bill >= 50 && bill <= 300
//   ? console.log(
//       `Bill= ${bill}, 15% Tip Added= ${(tip =
//         (15 * bill) / 100)}, Total= ${(totBill = bill + tip)}`
//     )
//   : console.log(
//       `Bill= ${bill}, 20% Tip Added= ${(tip =
//         (15 * bill) / 100)}, Total= ${(totBill = bill + tip)}`
//     );

// const tip = bill >= 50 && bill <= 300 ? 0.15 * bill : 0.2 * bill;
// // console.log(tip);
// console.log(
//   `The bill was ${bill}, So the tip ${tip}, hence the total bill value ${
//     bill + tip
//   }`
// );

let billLs = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
let tips = [];
let total = [];

function CalcTip(bill) {
  for (var i = 0; i < bill.length; i++) {
    const tip =
      bill[i] >= 50 && bill[i] <= 300 ? 0.15 * bill[i] : 0.2 * bill[i];
    tips.push(tip);
    total.push(bill[i] + tip);
  }
  return [tips, total];
  // return { tips, total };
}

//destructuring assignment syntax to unpack values
let [ti, to] = CalcTip(billLs);
console.log(ti, to);
// let values = CalcTip(billLs);
// console.log(values.tips, values.total);

// ========Calling func==================
// const fillBill = (tip, bill) => {
//   tips.push(tip);
//   total.push(bill + tip);
// };

// function CalcTip(bill) {
//   for (var i = 0; i < bill.length; i++) {
//     const tip =
//       bill[i] >= 50 && bill[i] <= 300 ? 0.15 * bill[i] : 0.2 * bill[i];
//     fillBill(tip, bill[i]);
//   }
//   // return [tips, total];
//   return { tips, total };
// }

// //destructuring assignment syntax to unpack values
// // let [tips, total] = CalcTip(billLs);
// // console.log(tips, total);
// let values = CalcTip(billLs);
// console.log(values.tips, values.total);

// //==== function callin====================
// const fillBill = (bill) => {
//   let tipls = CalcTip(bill);
//   for (var i = 0; i < tipls.length; i++) {
//     total.push(bill[i] + tipls[i]);
//   }
//   return [tipls, total];
// };

// function CalcTip(bill) {
//   for (var i = 0; i < bill.length; i++) {
//     const tip =
//       bill[i] >= 50 && bill[i] <= 300 ? 0.15 * bill[i] : 0.2 * bill[i];
//     tips.push(tip);
//   }
//   return tips;
// }
// let [ti, to] = fillBill(billLs);
// console.log(ti, to);
