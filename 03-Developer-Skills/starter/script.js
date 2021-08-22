// Remember, we're gonna use strict mode in all scripts now!
"use strict";

// console.log("take a rest");
// console.log(
//   "got an idea of building counter time to remind of stretching every 15 mins while studying "
// );

/*
Given an array of forecasted maximum temperatures, 
the thermometer displays a string with these temperatures.
Example: [17, 21, 23] will print "... 17ºC in 1 days ... 21ºC in 2 days ... 23ºC in 3 days ..."

Create a function 'printForecast' which takes in an array 'arr' 
and logs a string like the above to the console.

Use the problem-solving framework: Understand the problem and break it up into sub-problems!
TEST DATA 1: [17, 21, 23]
TEST DATA 2: [12, 5, -5, 0, 4]
*/

//PROBLEM 2:
// Function will receive an array of max temps

// 1) Understanding the problem
// - the funcion should display Temp reading as string

// 2) Breaking up into sub-problems
// - build function that accept arr argument
// - as it is an array we will use a loop to loop over each element
// - format the output string using  string template to includes
// - ... && ºC && current day as an index of the element
// - consider s in day OR days corrsponding to the value

let arr1 = [17, 21, 23];
let arr2 = [12, 5, -5, 0, 4];
let symb = "ºC";
let reading = "";

console.time("Timer1");
const TempForecast = function (arrTemp) {
  for (var i = 0; i < arrTemp.length; i++) {
    reading += ` ...${arrTemp[i]}${symb} in ${i + 1} ${
      i + 1 > 1 ? "days" : "day"
    }`;
  }
  return reading;
};
console.log(TempForecast(arr1));
// console.time("Timer1");
// var items = [];
// for (var i = 0; i < 100000; i++) {
//   items.push({ index: i });
// }
console.timeEnd("Timer1");
