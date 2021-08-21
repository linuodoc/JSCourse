data = [
  {
    mark: {
      mass: [78, 95],
      height: [1.69, 1.88],
    },
  },
  {
    john: {
      mass: [92, 85],
      height: [1.95, 1.76],
    },
  },
];

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

function AvgBmi(avgarray) {
  let sum = 0;
  for (var i in avgarray) {
    sum += avgarray[i];
  }
  let avg = sum / avgarray.length;
  return avg;
}

let bmi;
let bmiArray = [];
let obj = {};
for (var i = 0; i < data.length; i++) {
  //   console.log(i);
  for (var prop in data[i]) {
    // console.log(prop);
    // for (var x = 0; x < data[i][prop].height.length; x++) {
    for (var x = 0; x < 2; x++) {
      // console.log(`${[prop]} Mass`, data[i][prop].mass[x]);
      // console.log(`${[prop]} Height`, data[i][prop].height[x]);
      bmi = data[i][prop].mass[x] / data[i][prop].height[x] ** 2;
      console.log(`${[prop]} BMI reading-${x}:, ${bmi}`);
      bmiArray.push(bmi);
      obj[`${[prop]}`] = bmiArray;
      // console.log(obj);
      //   console.log(bmiArray);
    }
    bmiArray = [];
    // console.log(`${[prop]} AvgBMI:`, `${AvgBmi(bmiArray)}`);
    // console.log(obj);
  }
}
for (var i = 0; i < 2; i++) {
  for (var prop in obj) {
    console.log(obj[prop][i]);
  }
}
// console.log(obj["mark"][0]);
// console.log(obj["mark"][1]);
// console.log(obj["john"][0]);
// console.log(obj["john"][1]);
