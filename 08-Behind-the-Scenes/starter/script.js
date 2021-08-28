'use strict';

// {
//   console.log(me);
//   // undefined because of hosting
//   console.log(job);
//   // Not hoisting error because of TDZ from top of the scope 'global' till where variable declared
//   console.log(year);
//   //Not hositing same as let
//   var me = 'Jonas';
//   let job = 'teacher';
//   const year = 1991;
// }

// {
//   console.log(addDecl(1, 4));
//   // will return 5 cuz of hositing

//   // console.log(addDExpr(1, 4));
//   // error cuz function assigned to var variable which is hoisted
//   // and it will be set to undefined, hence trying to access undefined is not possible

//   // console.log(addArrow(1, 4));
//   // same as above howeever error is diff cuz its const.
//   //const will be accessble only after decl cuz of TDZ

//   function addDecl(a, b) {
//     return a + b;
//   }

//   var addExpr = function (a, b) {
//     return a + b;
//   };
//   const addArrow = (a, b) => a + b;
// }

//IMPORTANT EXAPLE
// console.log(numproduct);
// //hoisted and set to undefined
// if (!numproduct) delShoppingCart();
// // else console.log(numproduct);
// // // error cuz of TDZ of let & const
// var numproduct = 10;
// function delShoppingCart() {
//   console.log('All products Deleted');
// }

// var firstname = 'Matilda'; //global scope

//#### NEVER USE ARROW FUNCTION AS A METHOD

const jonas = {
  firstname: 'jonas',
  year: 1981,
  calcAge: function () {
    console.log(2037 - this.year);

    //Solution 1: REGULAR FUNC THIS >> UNDEFINED
    //Assign this to variable outside regular func scope to overcome issue
    // const isMillenial = function () {
    // console.log(this);
    //   console.log(this.year >= 1981 && this.year <= 1996);

    //   console.log(self);
    //   console.log(self.year >= 1981 && self.year <= 1996);
    // };

    //Solution 2:
    //Use arrow func. will inherent (This) from its parent
    const isMillenial = () => {
      console.log(this);
      console.log(this.year >= 1981 && this.year <= 1996);
    };
    isMillenial();
  },

  //   greet: () => {
  //     // console.log(this);
  //     console.log(`hey ${this.firstname}`); //this point to window obj
  greet: function () {
    console.log(this); // REGULAR FUNC HAS THIS KEY,
    //SO IT WILL LISTEN TO THE CALLING OBJECT
    console.log(`hey ${this.firstname}`);
  },
};
jonas.greet();
// jonas.calcAge();
