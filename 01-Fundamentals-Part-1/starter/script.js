// Type conversion & Coercion
{
  const myinput = "1983";
  console.log(myinput, typeof myinput);
  const convert = Number(myinput);
  console.log(convert, typeof convert);
  console.log(myinput + 20); //original value not still intacked
  console.log(Number("Ten"));

  //Coercion
  console.log(`I'm ` + 39 + ` years old`);
  console.log("25" > 20);
}

// program to compare two arrays
// function compareArrays(arr1, arr2) {
//   // compare arrays
//   const result = JSON.stringify(arr1) == JSON.stringify(arr2);
//   // if result is true
//   if (result) {
//     console.log("The arrays have the same elements.");
//   } else {
//     console.log("The arrays have different elements.");
//   }
// }
// const array1 = [1, 3, 5, 8];
// const array2 = [1, 3, 5, 8];
// compareArrays(array1, array2);

// const array1 = [1, 3, 5, 8];
// const array2 = [1, 3, 5, 8];
// compareArrays(array1, array2);

// array1.forEach((k) => {
//   array2.forEach((i) => {
//     console.log(k, i);
//   });
// });
