"use strict"

// let a = 5,
//     b = a;

// b = b + 5;

// console.log(b);
// console.log(a);

// const obj = {
//     a: 5,
//     b: 1
// };

// const copy = obj;// Ссылка, не копия

// copy.a = 10;

// console.log(copy);
// console.log(obj);


//1.Способ с циклами:
function copy (mainObj){
    let objCopy = {};
    let key;
    for (key in mainObj){
        objCopy[key] = mainObj[key];
    }
    return objCopy;
}

const numbers = {
    a: 2,
    b: 5,
    c:{
        x: 7,
        y: 4
    }
};

const newNumbers = copy (numbers);// Кланирование объекта

newNumbers.a = 10;

console.log(newNumbers);//{ a: 10, b: 5, c: { x: 7, y: 4 } }
console.log(numbers);//{ a: 2, b: 5, c: { x: 7, y: 4 } }

newNumbers.c.x = 10;//Поверхностная копия

console.log(newNumbers);//{ a: 10, b: 5, c: { x: 10, y: 4 } }
console.log(numbers);//{ a: 2, b: 5, c: { x: 10, y: 4 } }

//2. Способ Object assign():

const add = {
    d: 17,
    e: 20
};

console.log(Object.assign(numbers, add));  

const clone = Object.assign({}, add);  

clone.d = 20;

console.log(add);//{ d: 17, e: 20 }
console.log(clone);//{ d: 20, e: 20 }

//3. Способ копирования массива:

const oldArray = ['a', 'b', 'c'];
const newArray = oldArray.slice();//метод позволяет скопировать массив

newArray[1] = 'dadda';

console.log(newArray);//[ 'a', 'dadda', 'c' ]
console.log(oldArray);//[ 'a', 'b', 'c' ]

//4. Способ из стандартов ES6 (для массивов); ES8 (для массивов и объектов):

//Массив:
const video = ['youtube', 'vimeo', 'rutube'],
    blogs = ['wordpress', 'livejournal', 'blogger'],
    internet = [...video, ... blogs, 'vk', 'facebook'];

console.log(internet);//все данные будут в одном массиве


function log (a, b, c) {
    console.log(a);
    console.log(b);
    console.log(c);
}

const num = [2, 5, 7];

log(... num);// разложит массив на отдельные элементы

//Объект:

const array = ["a", "b"];

const newArray = [...array];
const q = {
    one: 1,
    two: 2
};

const newObj = {...q};


