'use strict';

const inputRub = document.querySelector('#rub'),
      inputUsd = document.querySelector('#usd');

inputRub.addEventListener('input', () => {
    const request = new XMLHttpRequest();//конструкция создает новый объект

    request.open('GET', 'js/current.json');//методы
     request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
     request.send();
     
    request.addEventListener('load', () => {//запускаем обработчик события отслеживать статус запроса в текущий момент
        // if (request.readyState === 4 && request.status === 200) {//получаем текущее состояние объекта 4 (DONE) и реквест статус будет 200 т.е. запрос успешно завершился
        if (request.status === 200){   
            console.log(request.response);//выводим в консоль
            const data = JSON.parse(request.response);
            inputUsd.value = (+inputRub.value / data.current.usd).toFixed(2);//расчет соотношения и ограничение элементов после точки
        } else {
            inputUsd.value = "Что-то пошло не так";
        }
    });

    // status
    // statusText
    // response
    // readyState
});