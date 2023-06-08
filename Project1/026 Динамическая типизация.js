'use strict';

//To String

//1)
console.log(typeof(String(null)));//string
console.log(typeof(String(4)));//string

//Конкатенация

//2)
console.log(typeof((5 + '')));//string


const num = 5;

console.log("https://vk.com/catalog/"+ num);

const fontSize = 26 + 'px';

//To Number
 //1)
 console.log(typeof(Number('4')));//number

 //2)
 console.log(typeof(+'4'));//number

 //3)
  console.log(typeof(parseInt("15px", 10)));//number

  let answ = +prompt("Hello", "");

  //To boolean

//   0, '', null, undefined, NaN;//false
  
//1)
let switcher = null;

if(switcher){
    console.log('Working...');
}

switcher = 1;

if(switcher){
    console.log('Working...');
}

// 2)
console.log(typeof(Boolean('4')));//boolean

// 3)
console.log(typeof(!!"444"));//boolean