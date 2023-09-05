const btn = document.querySelector('.btn');
let timerId, // объявляется переменная
    i = 0;

function myAnimation() {
    const elem = document.querySelector('.box');
    let pos = 0;

    const id = setInterval(frame, 10);
    function frame() {
        if (pos == 300){
            clearInterval(id);
        }else{
            pos++;
            elem.style.top = pos + "px";
            elem.style.left = pos +'px';
        }
    }
}

btn.addEventListener('click', myAnimation);

// btn.addEventListener('click', () =>{//обрабSотчик события клика на кнопку
//     // const timerId = setTimeout(logger, 2000);//Запустили таймер
//     timerId = setInterval(logger, 500);//Запустили таймер интервала в пол сек
// });

// function logger () {
//     if (i === 3) {
//         clearInterval(timerId);//Отсановили таймер
//     }
//     console.log('text');
//     i++;
// }

// let id = setTimeout(function log(){
//     console.log('Hello');
//     id = setTimeout(log, 500);
// }, 500);//рекурсивный вызов