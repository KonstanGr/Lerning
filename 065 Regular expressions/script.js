'use strict';

// new RegExp('pattern', 'flags');
// /pattern/f

// const ans = prompt('Введите ваше имя');

// const reg = /\d/;//паттерн
// console.log(ans.match(reg));

const str = 'My name is R2D2';

console.log(str.match(/\w\d\w\d/i));

// \D // ищим все не цифры
// \W // ищим все не буквы

// \d //digets - ищим цифры
// \w //words - ищим все слова
// \s //spaces - ищим все пробелы
   //это классы

// i // найти что-то в независимости от регистра
// g // поиск нескольких вхождений
// m // включает мегастрочный режим 
        // это флаги

// console.log(ans.search(reg));// получим результат строка
// console.log(ans.match(reg));//получим массив данных

// const pass = prompt('Password');

// console.log(pass.replace(/\./g, "*"));// (что заменяем), (на что заменяем);
//если внутри регулярного выражения ставим точку /./, то значит мы берем все элементы, которые попадут в строку
//для того чтобы взять отдельную точку нужно прописать \ - экранирование символа.

// console.log('12-34-56'.replace(/-/g, ':'));// все дефисы поменять на :.

