'use strict';

// console.log(document.querySelector('.message').textContent);
// document.querySelector('.message').textContent = 'Correct secertNumber';
// console.log(document.querySelector('.score').value);
// document.querySelector('.score').textContent = 100;

// //generate a secert number
// let secertNumber = Math.trunc(Math.random() * 20 + 1);
// let score = 20;
// let hscore = 0;
// const displayMsg = function (message) {
//   document.querySelector('.message').textContent = message;
// };
// document.querySelector('.score').textContent = score;

// //event handler on check btn element
// document.querySelector('.check').addEventListener('click', function () {
//   const guess = Number(document.querySelector('.guess').value);

//   if (!guess) {
//     //no number entered
//     // console.log('No number entered');
//     // document.querySelector('.message').textContent = 'Please guess a number';
//     displayMsg('Please guess a number');
//     // win logic
//   } else if (guess === secertNumber) {
//     // document.querySelector('.message').textContent = 'You guessed right';
//     displayMsg('You guessed right');
//     document.querySelector('.number').textContent = guess;
//     document.querySelector('.number').style.width = '30%';
//     document.querySelector('body').style.backgroundColor = '#60b347';
//     if (score > hscore) {
//       hscore = score;
//       document.querySelector('.highscore').textContent = hscore;
//     }
//     // guessed number is High
//   } else if (guess > secertNumber) {
//     // document.querySelector('.message').textContent = 'Guess too high';
//     displayMsg('Guess too high');
//     if (score > 1) {
//       score--;
//       document.querySelector('.score').textContent = score;
//     } else {
//       // document.querySelector('.message').textContent = 'you lose the game';
//       displayMsg('you lose the game');
//     }
//     //guessed number is too low
//   } else if (guess < secertNumber) {
//     // document.querySelector('.message').textContent = 'Guess too low';
//     displayMsg('Guess too low');
//     if (score > 1) {
//       score--;
//       document.querySelector('.score').textContent = score;
//     } else {
//       // document.querySelector('.message').textContent = 'you lose the game';
//       displayMsg('you lose the game');
//     }
//   }
// });

// //event handler to reset the game
// document.querySelector('.again').addEventListener('click', function () {
//   secertNumber = Math.trunc(Math.random() * 20 + 1);
//   //   console.log(secertNumber);
//   score = 20;
//   document.querySelector('.guess').value = '';
//   document.querySelector('.number').textContent = '?';
//   document.querySelector('.number').style = 'hidden';
//   document.querySelector('.score').textContent = score;
//   document.querySelector('body').style.backgroundColor = '#222';
//   document.querySelector('.message').textContent = 'start guessing';
// });

//generate a secert number
let secertNumber = Math.trunc(Math.random() * 20 + 1);
let score = 20;
let highScore = 0;
document.querySelector('.score').textContent = score;

const displayMsg = function (message) {
  document.querySelector('.message').textContent = message;
};
//event handler on check btn element
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  if (!guess) {
    displayMsg('Please guess a number');

    // win logic
  } else if (guess === secertNumber) {
    displayMsg('You guessed right');
    document.querySelector('.number').textContent = guess;
    document.querySelector('.number').style.width = '30%';
    document.querySelector('body').style.backgroundColor = '#60b347';
    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }
    // guessed wrong number
  } else if (guess !== secertNumber) {
    guess > secertNumber ? displayMsg('Too high') : displayMsg('Too low');
    if (score > 1) {
      score--;
      document.querySelector('.score').textContent = score;
    } else displayMsg('you lose the game');
  }
});

//event handler to reset the game
document.querySelector('.again').addEventListener('click', function () {
  secertNumber = Math.trunc(Math.random() * 20 + 1);
  //   console.log(secertNumber);
  score = 20;
  document.querySelector('.guess').value = '';
  document.querySelector('.number').textContent = '?';
  document.querySelector('.number').style = 'hidden';
  document.querySelector('.score').textContent = score;
  document.querySelector('body').style.backgroundColor = '#222';
  displayMsg('start guessing');
});
