'use strict';

const box = document.getElementById('box');
console.log(box);

const btns = document.getElementsByTagName('button')[1];//HTMLколлекция Псевдомассив, у которого ссылка на индекс кнопки №2
console.log(btns[2]);//Также обратиться можно таким способом

const circles = document.getElementsByClassName('circle');//метод уже подразумевает поиск класса => без точки
console.log(circles);

const hearts = document.querySelectorAll('.heart');//когда идет селектор, тогда нужно ставить точку перед указанием класса

hearts.forEach(item =>{
    console.log(item);
});

const oneHeart = document.querySelector('.heart');
console.log(oneHeart);