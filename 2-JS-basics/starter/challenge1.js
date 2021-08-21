// BMI = mass in KG / Heigh **2 - height in meter

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
for (var i = 0; i < data.length; i++) {
  for (var prop in data[i]) {
    for (var x = 0; x < data[i][prop].height.length; x++) {
      // console.log(`${[prop]}`, data[i][prop].mass[x]);
      // console.log(`${[prop]}`, data[i][prop].height[x]);
      bmi = data[i][prop].mass[x] / data[i][prop].height[x] ** 2;
      console.log(`${[prop]} BMI reading-${x}:`, `${bmi}`);
      bmiArray.push(bmi);
      // console.log(bmiArray);
    }
    console.log(`${[prop]} AvgBMI:`, `${AvgBmi(bmiArray)}`);
  }
}
