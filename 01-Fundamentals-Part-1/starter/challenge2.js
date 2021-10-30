"use strict";
// data = [
//   {
//     mark: {
//       mass: [78, 95],
//       height: [1.69, 1.88],
//     },
//   },
//   {
//     john: {
//       mass: [92, 85],
//       height: [1.95, 1.76],
//     },
//   },
// ];

// for (var i = 0; i < data.length; i++) {
//   console.log(Object.keys(data[i]));
// }

// for (var i = 0; i < data.length; i++) {
//   for (var prop in data[i]) console.log(Object.keys(data[i][prop]));
// }

// for (var i = 0; i < data.length; i++) {
//   console.log(i);
//   for (var prop in data[i]) {
//     console.log(prop);
//     // console.log(data[i]);
//     for (var [key, value] of Object.entries(data[i][prop])) {
//       console.log(`${key}, ${value}`);
//       //   console.log(typeof value);
//       console.log(data[i][prop].key);
//       //   let bmi = data[i][prop].value / data[i][prop].height[x] ** 2;
//     }
//   }
// }

// function AvgBmi(avgarray) {
//   let sum = 0;
//   for (var i in avgarray) {
//     sum += avgarray[i];
//   }
//   let avg = sum / avgarray.length;
//   return avg;
// }

// let bmi;
// let bmiArray = [];
// let obj = {};
// for (var i = 0; i < data.length; i++) {
//   //   console.log(i);
//   for (var prop in data[i]) {
//     // console.log(prop);
//     // for (var x = 0; x < data[i][prop].height.length; x++) {
//     for (var x = 0; x < 2; x++) {
//       // console.log(`${[prop]} Mass`, data[i][prop].mass[x]);
//       // console.log(`${[prop]} Height`, data[i][prop].height[x]);
//       bmi = data[i][prop].mass[x] / data[i][prop].height[x] ** 2;
//       console.log(`${[prop]} BMI reading-${x}:, ${bmi}`);
//       bmiArray.push(bmi);
//       obj[`${[prop]}`] = bmiArray;
//       // console.log(obj);
//       //   console.log(bmiArray);
//     }
//     bmiArray = [];
//     // console.log(`${[prop]} AvgBMI:`, `${AvgBmi(bmiArray)}`);
//     // console.log(obj);
//   }
// }

// for (var i = 0; i < 2; i++) {
//   for (var prop in obj) {
//     console.log(obj[prop][i]);
//   }
// }
// console.log(obj["mark"][0]);
// console.log(obj["mark"][1]);
// console.log(obj["john"][0]);
// console.log(obj["john"][1]);

const Mark = {
  name: "Mark Miller",
  mass: 78,
  height: 1.69,
  CalcBMI: function () {
    this.bmi = Math.round(this.mass / this.height ** 2);
    return this.bmi;
  },
};

const Jhone = {
  name: "John Smith",
  mass: 92,
  height: 1.95,
  CalcBMI: function () {
    this.bmi = Math.round(this.mass / this.height ** 2);
    return this.bmi;
  },
};

// console.log(Jhone.CalcBMI());
// console.log(Mark.CalcBMI());

if (Mark.CalcBMI() > Jhone.CalcBMI()) {
  console.log(
    `${Mark.name}'s BMI ${Mark.bmi} is higher than ${Jhone.name}'s BMI ${Jhone.bmi}`
  );
} else {
  console.log(
    `${Jhone.name}'s BMI ${Jhone.bmi} is higher than ${Mark.name}'s BMI ${Mark.bmi}`
  );
}
