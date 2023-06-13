'use strict';

const box = document.getElementById('box'),
        btns = document.getElementsByTagName('button'),
        circles = document.getElementsByClassName('circle'),
        wrapper = document.querySelector('.wrapper'),
        hearts = wrapper.querySelectorAll('.heart'),
        oneHeart = wrapper.querySelector('.heart');

// box.style.backgroundColor = 'blue';
// box.style.width = '500px';

box.style.cssText = `background-color: blue; width: 500px`;

btns[1].style.borderRadius = '100%';
circles[0].style.backgroundColor = 'red';

// for (let i = 0; i < hearts.length; i++) {
//         hearts[i].style.backgroundColor = 'blue';
// }

hearts.forEach(item => {
        item.style.backgroundColor = 'blue';
});

const div = document.createElement('div');
// const text = document.createTextNode('Тут был я');

div.classList.add('black');

wrapper.append(div);

// document.body.append(div);//В конец HTML
//document.querySelector('.wrapper').append(div);//Добавить в wrapper
// wrapper.prepend(div);
// wrapper.appendChild(div);//Для прошлых версий

// hearts[0].before(div);
// hearts[0].after(div);
// wrapper.insertBefore(div, hearts[0]);// Для прошлых версий

// circles[0].remove();
// wrapper.removeChild(hearts[1]);// Для прошлых версий

// hearts[0].replaceWith(circles[0]);
// wrapper.replaceChild(circles[0], hearts[0]);// Для прошлых версий

div.innerHTML = "<h1>Hello World</h1>";// HTML структура

//div.textContent = "Hello";// HTML структура не подойдёт!

div.insertAdjacentHTML('beforeend', '<h2>Hello</h2>');