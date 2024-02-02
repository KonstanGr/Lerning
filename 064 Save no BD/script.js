'use strict';

// localStorage.setItem('number', 5);//пишем (ключ , значение) и в глобальный объект localStorage запишется новое поле number со значением 5 

// // localStorage.removeItem('number');//можем удалить ключ из глобального объекта
// // localStorage.clear();//полностью очищает локальное хранилище

// console.log(localStorage.getItem('number'));//получить данные с нащего глобального объекта

const checkbox = document.querySelector('#checkbox'),
    form = document.querySelector('form'),
    change = document.querySelector('#color');

    if (localStorage.getItem('isChecked')) {
        checkbox.checked = true;
    }

    if (localStorage.getItem('bg') === 'changed'){
        form.style.backgroundColor = 'red';
    }

checkbox.addEventListener('click', () => {
    localStorage.setItem('isChecked', true);
});

change.addEventListener('click', () => {
    if (localStorage.getItem('bg') === 'changed'){
        localStorage.removeItem('bg');
        form.style.backgroundColor = '#fff';
    }else{
        localStorage.setItem('bg', 'changed');
        form.style.backgroundColor = 'red';
    }
});

const persone = {
    name: 'Alex',
    age: 25,
};

const serializedPerson = JSON.stringify(persone);
localStorage.setItem('alex', serializedPerson);

console.log(JSON.parse(localStorage.getItem('alex')));