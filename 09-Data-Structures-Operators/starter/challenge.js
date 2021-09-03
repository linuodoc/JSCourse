//########## CHALLENEG-1 ###############
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: { team1: 1.33, x: 3.25, team2: 6.5 },
  printGoals: function (...nplayers) {
    console.log(`${nplayers.length} Goals were scored`);
  },
};
//1- Create one player array for each team (variables 'players1' and 'players2')
const [players1, players2] = game.players;

// /* 2- The first player in any player array is the goalkeeper and the others are field
// players. For Bayern Munich (team 1) create one variable ('gk') with the
// goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10
// field players*/
// const [gk, ...fieldPlayers] = game.players[0];
const [gk, ...fieldPlayers] = players1;
console.log(gk);
console.log(fieldPlayers);

/*3- Create an array 'allPlayers' containing all players of both teams (22
// players) */
// const allPlayers = [...game.players[0], ...game.players[1]];
const allPlayers = [...players1, ...players2];
console.log(allPlayers);

// /**4- During the game, Bayern Munich (team 1) used 3 substitute players. So create a
// new array ('players1Final') containing all the original team1 players plus
// 'Thiago', 'Coutinho' and 'Perisic'*/
// const [...players1Final] = [
//   ...game.players[0],
//   'Thiago',
//   'Coutinho',
//   'Perisic',
// ];
// console.log(players1Final);
const [...players1Final] = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
console.log(players1Final);

/**5- Based on the game.odds object, create one variable for each odd (called
'team1', 'draw' and 'team2') */
const { team1, x: draw, team2 } = game.odds;
console.log(team1, team2, draw);

/**6- Write a function ('printGoals') that receives an arbitrary number of player
names (not an array) and prints each of them to the console, along with the
number of goals that were scored in total (number of player names passed in) */
// game.printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
// game.printGoals('Lewandowski', 'Kimmich');
game.printGoals(...game.scored);

/**7- The team with the lower odd is more likely to win. Print to the console which
team is more likely to win, without using an if/else statement or the ternary
operator. */
// && || ??

// || will short circut once the the first operand is true and will not continue
//to evaluate the second operand so in this scenario we need to use && to continue evaluation
team1 < team2 && console.log(`${game.team1} is more likely to win`);

/**Test data for 6.: First, use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'.
Then, call the function again with players from game.scored */

//########## CHALLENEG-2 ###############
//1- Loop over the game.scored array and print each player name to the console,
// along with the goal number (Example: "Goal 1: Lewandowski")
//  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
// let temp = Object.values(game.scored);
// console.log(temp);
const [...pl] = [...game.scored];
for (const [key, v] of pl.entries()) {
  console.log(`Goal ${key + 1}: ${v}`);
}

//2- Use a loop to calculate the average odd and log it to the console
let avg = 0;
let odds = Object.values(game.odds);
for (const item of odds) avg += item;
avg /= odds.length;
console.log(avg);

/* 3- Print the 3 odds to the console, but in a nice formatted way, exactly like this:
Odd of victory Bayern Munich: 1.33
Odd of draw: 3.25
Odd of victory Borrussia Dortmund: 6.5 */

for (const [key, v] of Object.entries(game.odds)) {
  const teamStr = key === 'x' ? 'Draw' : `Victory ${game[key]}`;
  console.log(`Odd of ${teamStr} ${v}`);
}

/* 4 - Bonus: Create an object called 'scorers' which contains the names of the
players who scored as properties, and the number of goals as the value. In this
game, it will look like this:
//  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
{
Gnarby: 1,
Hummels: 1,
Lewandowski: 2
}
*/
const obj = {};
game.scored.forEach(item => {
  if (!obj[item]) obj[item] = 0;
  obj[item] += 1;
});
for (const [key, v] of Object.entries(obj)) {
  console.log(`Goal ${key}: ${v}`);
}

const scorers = {};
for (const player of game.scored) {
  scorers[player] ? scorers[player]++ : (scorers[player] = 1);
}
for (const [key, v] of Object.entries(scorers)) {
  console.log(`Goal ${key}: ${v}`);
}

//########## CHALLENEG-3 ###############
const gameEvents = new Map([
  [17, '⚽ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽ GOAL'],
  [80, '⚽ GOAL'],
  [92, '🔶 Yellow card'],
]);
// console.log(gameEvents);

//1- Create an array 'events' of the different game events that happened (no
// duplicates)
const gEvent = new Set();
for (const e of gameEvents) gEvent.add(e);
console.log([...gEvent]);

const gamEvents = [...new Set(gameEvents.values())];
console.log(gamEvents);

/*2- After the game has finished, is was found that:
the yellow card from minute 64 was unfair. 
So remove this event from the game events log.*/
if (gameEvents.get(64) === '🔶 Yellow card') gameEvents.delete(64);
console.log(gameEvents);

/*Compute and log the following string to the console:
"An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)*/

const gameTime = [...gameEvents.keys()].pop();
// console.log(gameTime);
console.log(
  `An event happened, on average, every ${gameTime / gameEvents.size} minutes`
);

/** Loop over 'gameEvents' and log each element to the console, marking
whether it's in the first half or second half (after 45 min) of the game, like this:
[FIRST HALF] 17: ⚽ GOAL */

for (const [key, v] of gameEvents) {
  console.log(
    key <= 45 ? `[First Half] ${key}: ${v}` : `[Second Half] ${key}: ${v}`
  );
}

for (const [min, event] of gameEvents) {
  const half = min <= 45 ? 'FIRST' : 'SECOND';
  console.log(`[${half} Half] ${min}: ${event}`);
}

console.clear();

//########## CHALLENEG-4 ###############
/**Write a program that receives a list of variable names written in underscore_case
and convert them to camelCase.
The input will come from a textarea inserted into the DOM (see code below to
insert the elements), and conversion will happen when the button is pressed. */

/** Test data (pasted to textarea, including spaces):
underscore_case
first_name
Some_Variable
calculate_AGE
delayed_departure
*/

/**Should produce this output (5 separate console.log outputs):
underscoreCase   ✅
firstName        ✅✅
someVariable     ✅✅✅
calculateAge     ✅✅✅✅
delayedDeparture ✅✅✅✅✅
*/

/**
 * Hints:
1 Remember which character defines a new line in the textarea 😉
2 The solution only needs to work for a variable made out of 2 words, like a_b
3 Start without worrying about the ✅. Tackle that only after you have the variable
name conversion working 😉
4 This challenge is difficult on purpose, so start watching the solution in case
you're stuck. Then pause and continue!
*/

// document.body.append(document.createElement('textarea'));
// document.body.append(document.createElement('button'));

const strPadding = function (strArr) {
  for (const [i, word] of strArr.entries()) {
    console.log(`${word.padEnd(20, ' ')}${'✔'.repeat(i + 1)}`);
  }
};
const camelCaseFun = function (arr) {
  const camelCaseArr = [];
  for (const str of arr) {
    const words = str.toLowerCase().trim().split('_');
    const camelCase = words[0] + words[1][0].toUpperCase() + words[1].slice(1);
    camelCaseArr.push(camelCase);
  }
  return strPadding(camelCaseArr);
};

document.querySelector('.convert').addEventListener('click', function () {
  const words = document.querySelector('.textarea').value.split('\n');
  // document.querySelector('.result').textContent = camelCaseFun(words);
  console.log(camelCaseFun(words));
});
