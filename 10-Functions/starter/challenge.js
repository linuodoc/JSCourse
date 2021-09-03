'use strict';
///////////////////////////////////////
// Coding Challenge #1

// Let's build a simple poll app!
// 1- A poll has a question,
// 2- an array of options from which people can choose,
// 3- and an array with the number of replies for each option.
// 4- This data is stored in the starter object below.
// Here are your tasks:

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0),

  registerNewAnswer() {
    const opt = Number(
      prompt(
        `${this.question}\n${this.options.join('\n')}\n(Write option number)`
      )
    );
    typeof opt === 'number' && opt < this.answers.length && this.answers[opt]++;
    this.displayResults('string');
    this.displayResults();
  },

  displayResults(type = []) {
    type === 'string'
      ? console.log(`Poll results are ${this.answers.join(', ')}`)
      : console.log(this.answers);
  },
};
// 1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
//   1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
//         What is your favourite programming language?
// 0: JavaScript
// 1: Python
// 2: Rust
// 3: C++
// (Write option number)

// 1.2. Based on the input number, >>update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)

// 2. Call this method whenever the user clicks the "Answer poll" button.
const pollReg = poll.registerNewAnswer;
document.querySelector('.poll').addEventListener('click', pollReg.bind(poll));

// 3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1".

// const displayResults = function (type = []) {
//   Array.isArray(type)
//     ? console.log(type)
//     : console.log(`Poll results are ${type}`);
// };

// const arr = [5, 2, 3];
// displayResults([...arr]);
// displayResults('5,2,3');

// 4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

// HINT: Use many of the tools you learned about in this and the last section 😉

// BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?
// BONUS TEST DATA 1: [5, 2, 3]
// BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

const data1 = [5, 2, 3];
const data2 = [1, 5, 3, 9, 6, 1];
// poll.displayResults.call({ answers: data1 });
// poll.displayResults.call({ answers: data2 }, 'string');
// poll.displayResults.apply({ answers: [...data2] });

const Results = poll.displayResults;
const disData = Results.bind({ answers: [...data2] });
disData('string');
disData();

// GOOD LUCK 😀

// Coding Challenge #2

/* 
This is more of a thinking challenge than a coding challenge 🤓

Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.

GOOD LUCK 😀
*/
let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g();
f();
console.dir(f);

// Re-assigning f function
h();
f();
console.dir(f);

console.clear();

let test;
test = () => (document.body.style.backgroundColor = 'black');

let colorSetter;

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  colorSetter = function () {
    const cl = Math.floor(Math.random() * 16777215).toString(16);
    console.log(cl);
    return (function () {
      console.log('color is', cl);
      header.style.color = `${'#' + cl}`;
    })();
  };

  // colorSetter = () => {
  //   const cl = Math.floor(Math.random() * 16777215).toString(16);
  //   console.log(cl);
  //   header.style.color = `${'#' + cl}`;
  // };

  // document
  //   .querySelector('body')
  //   .addEventListener('click', () => (header.style.color = 'blue'));
})();

document.querySelector('body').addEventListener('click', colorSetter);
