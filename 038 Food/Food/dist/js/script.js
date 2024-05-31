window.addEventListener('DOMContentLoaded', () =>{//назначение глобального обработчика событий
    const tabs = require('./modules/tabs'),
          modal = require('./modules/modal'),
          timer = require('./modules/timer'),
          cards = require('./modules/cards'),
          forms = require('./modules/forms'),
          slider = require('./modules/slider'),
          calc = require('./modules/calc');

    tabs();
    modal();
    timer();
    cards();
    forms();
    slider();
    calc();
});//импортируем все кусочки кода