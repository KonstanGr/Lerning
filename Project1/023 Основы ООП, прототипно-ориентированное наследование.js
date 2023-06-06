"use strict";

let str = "some";//Примитивный тип данных
let strObj = new String(str);//Превратился в объект, потом обратно в примитив

// console.log(typeof(str));
// console.log(typeof(strObj));

console.dir([1, 2, 3]);

const soldier = {
    health: 400,
    armor: 100
};

const jonh = {
    health: 100,
};

//jonh.__proto__ = soldier; // В старых вариантахы

Object.setPrototypeOf(jonh, soldier);

jonh.sayHello();