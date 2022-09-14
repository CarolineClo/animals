"use strict";

let year;

function isItLeap(year) {
  //is it devisible by 4?
  if (year % 4 === 0) {
    //console.log("is it divisible by 100?");
    if (year % 100 === 0) {
      //console.log("is devisible by 400?");
      if (year % 400 === 0) {
        console.log(`${year} is a leap year`);
      } else {
        console.log(`${year} is not leap year`);
      }
    } else {
      console.log(`${year} is a leap year`);
    }
  } else {
    console.log(`${year} is not leap year`);
  }
}

isItLeap(2015);
//isItLeap(2015);

/* ANOTHER WAY (NOT OPTIMAL BUT IT WORKS)
 let yearByFour = year / 4;
  let yearBy100 = year / 100;
  let yearBy400 = year / 400;
  //is it divisible by 4? if no not a leap year if yes...
  if (Number.isInteger(yearByFour)) {
    //console.log("is it divisible by 100?");
    if (Number.isInteger(yearBy100)) {
      //console.log("is devisible by 400?");
      if (Number.isInteger(yearBy400)) {
        console.log(`${year} is a leap year`);
      } else {
        console.log(`${year} is not leap year`);
      }
    } else {
      console.log(`${year} is a leap year`);
    }
  } else {
    console.log(`${year} is not leap year`);
  }

  ANOTHER WAY NOT OPTIMAL

 let year;

function isItLeap(year) {
    //is it devisible by 4?
  if (year % 4 === 0) {
    //console.log("is it divisible by 100?");
    if (year % 100 === 0) {
      //console.log("is devisible by 400?");
      if (year % 400 === 0) {
        console.log(`${year} is a leap year`);
      } else {
        console.log(`${year} is not leap year`);
      }
    } else {
      console.log(`${year} is a leap year`);
    }
  } else {
    console.log(`${year} is not leap year`);
  }
}

isItLeap(2015);
*/
