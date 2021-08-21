let bill = 275;
let totBill;

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

const tip = bill >= 50 && bill <= 300 ? 0.15 * bill : 0.2 * bill;
// console.log(tip);
console.log(
  `The bill was ${bill}, So the tip ${tip}, hence the total bill value ${
    bill + tip
  }`
);
