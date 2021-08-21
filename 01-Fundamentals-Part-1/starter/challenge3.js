//Coding Challenge:-3
//Solutoin 1
// let dolphineScores = [96, 108, 89];
// let koalaScores = [88, 91, 110];
// let avgScore;

// function AvgScoreCal(scoArray) {
//   let sum = 0;
//   for (var i = 0; i < scoArray.length; i++) {
//     sum += scoArray[i];
//   }
//   return (avgScore = sum / scoArray.length);
// }

// let dolphAvg = AvgScoreCal(dolphineScores);
// let koalaAvg = AvgScoreCal(koalaScores);
// console.log(dolphAvg, koalaAvg);

// if (dolphAvg > koalaAvg && dolphAvg >= 100) {
//   console.log(
//     `Dolphine Avg Score ${Math.round(dolphAvg)} won the competeion !!`
//   );
// } else if (koalaAvg > dolphAvg && koalaAvg >= 100) {
//   console.log(`Koala Avg Score ${Math.round(koalaAvg)} won the competeion`);
// } else if (dolphAvg === koalaAvg && dolphAvg >= 100 && koalaAvg >= 100) {
//   console.log(`Basically its a Draw `);
// } else console.log("No Teams win the trophy");

// Solution 2
// let dolphineScoresSet = [
//   [96, 108, 89],
//   [97, 112, 101],
//   [109, 95, 123],
// ];
// let koalaScoresSet = [
//   [88, 91, 110],
//   [97, 112, 101],
//   [109, 95, 107],
// ];

//   function AvgScoreCal(ScoreSet) {
//     let sum = 0;
//     let avgScores = [];
//     for (var x in ScoreSet) {
//       // console.log(ScoreSet[x]);
//       for (var i = 0; i < ScoreSet[x].length; i++) {
//         sum += ScoreSet[x][i];
//       }
//       // console.log(sum);
//       avg = sum / ScoreSet[x].length;
//       avgScores.push(Math.round(avg));
//       sum = 0;
//     }
//     return avgScores;
//   }

//   let dolphAvgScores = AvgScoreCal(dolphineScoresSet);
//   console.log(dolphAvgScores);
//   let koalaAvgScores = AvgScoreCal(koalaScoresSet);
//   console.log(koalaAvgScores);

//   for (var i = 0; i < dolphAvgScores.length; i++) {
//     console.log(dolphAvgScores[i], koalaAvgScores[i]);
//     if (dolphAvgScores[i] > koalaAvgScores[i] && dolphAvgScores[i] >= 100) {
//       console.log("Dolphin Won, Koala lose");
//     } else if (
//       koalaAvgScores[i] > dolphAvgScores[i] &&
//       koalaAvgScores[i] >= 100
//     ) {
//       console.log("koala Won, Dolphin lose");
//     } else if (
//       koalaAvgScores[i] === dolphAvgScores[i] &&
//       koalaAvgScores[i] >= 100 &&
//       dolphAvgScores[i] >= 100
//     ) {
//       console.log("Basically its a Draw");
//     } else console.log("No Teams win the trophy");
//   }
// }

// Solution 3
// let dolphineScoresSet = [
//   [96, 108, 89],
//   [97, 112, 101],
//   [109, 95, 123],
// ];
// let koalaScoresSet = [
//   [88, 91, 110],
//   [97, 112, 101],
//   [109, 95, 107],
// ];

// function checkComp(avg1, avg2) {
//   if (avg1 > avg2 && avg1 >= 100) {
//     console.log("Dolphin Won, Koala lose");
//   } else if (avg2 > avg1 && avg2 >= 100) {
//     console.log("koala Won, Dolphin lose");
//   } else if (avg2 === avg1 && avg2 >= 100 && avg1 >= 100) {
//     console.log("Basically its a Draw");
//   } else console.log("No Teams win the trophy");
// }

// function AvgScoreCal(Team1ScoreSet, Team2ScoreSet) {
//   let sum1 = 0;
//   let sum2 = 0;
//   let avg1,
//     avg2 = 0;
//   // let avgScores = [];
//   for (var x in Team1ScoreSet) {
//     // console.log(Team1ScoreSet[x]);
//     // console.log(Team2ScoreSet[x]);
//     for (var i in Team1ScoreSet[x]) {
//       // console.log(Team1ScoreSet[x][i]);
//       // console.log(Team2ScoreSet[x][i]);
//       sum1 += Team1ScoreSet[x][i];
//       sum2 += Team2ScoreSet[x][i];
//     }
//     // console.log("sum1:", sum1);
//     // console.log("sum2:", sum2);
//     avg1 = sum1 / Team1ScoreSet[x].length;
//     avg2 = sum2 / Team2ScoreSet[x].length;
//     console.log("avg1:", avg1);
//     console.log("avg2:", avg2);
//     checkComp(avg1, avg2);
//     sum1 = 0;
//     sum2 = 0;
//   }
//   return avg1, avg2;
// }

// let CheckWinner = AvgScoreCal(dolphineScoresSet, koalaScoresSet);

// Solution 3 enhanced
let dolphineScoresSet = [
  [96, 108, 89],
  [97, 112, 101],
  [109, 95, 123],
];
let koalaScoresSet = [
  [88, 91, 110],
  [97, 112, 101],
  [109, 95, 107],
];

function AvgScoreCal(Team1ScoreSet, Team2ScoreSet) {
  let sum1 = 0;
  let sum2 = 0;
  for (var x in Team1ScoreSet) {
    for (var i in Team1ScoreSet[x]) {
      sum1 += Team1ScoreSet[x][i];
      sum2 += Team2ScoreSet[x][i];
    }
    let avg1 = Math.round(sum1 / Team1ScoreSet[x].length);
    let avg2 = Math.round(sum2 / Team2ScoreSet[x].length);
    checkComp(avg1, avg2);
    sum1 = 0;
    sum2 = 0;
  }
}

function checkComp(Team1avg, Team2avg) {
  if (Team1avg > Team2avg && Team1avg >= 100) {
    console.log(`Dolphin (${Team1avg}) Won, Koala (${Team2avg}) lose`);
  } else if (Team2avg > Team1avg && Team2avg >= 100) {
    console.log(`koala ${Team2avg} Won, Dolphin ${Team1avg} lose`);
  } else if (Team2avg === Team1avg && Team2avg >= 100 && Team1avg >= 100) {
    console.log(`(${Team1avg} == ${Team2avg}) Basically its a Draw`);
  } else console.log(`(${Team1avg}, ${Team2avg}) No Teams win the trophy`);
}

let CheckWinner = AvgScoreCal(dolphineScoresSet, koalaScoresSet);
