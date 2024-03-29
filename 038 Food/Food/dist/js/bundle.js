/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((module) => {

function calc(){
    //Calc

  const result = document.querySelector('.calculating__result span');
  
  let sex, height, weight, age, ratio;//назначаем переменные в одну строку

  if (localStorage.getItem('sex')) {//
    sex = localStorage.getItem('sex');//устанавливаем переменную в которую получаем значение из localStorage
  } else {
    sex = 'female';//если нет значения из localStorage, то ставим исходную позицию female
    localStorage.setItem('sex', 'female');//и при этом установим в localStorage значения пол - женский
  }

  if (localStorage.getItem('ratio')) {//инициализируем условие
    ratio = localStorage.getItem('ratio');//устанавливаем переменную, в которую получаем значение из localStorage
  } else {
    ratio = 1.375;//если нет значения из localStorage, то ставим исходную позицию 1.375
    localStorage.setItem('ratio', 1.375);//и при этом установим в localStorage значения ratio - 1.375
  }

  function calcTotal() {
    if (!sex || !height || !weight || !age || !ratio){
        result.textContent = '____';
        return;
    }

    if(sex === 'female') {
        result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);//формула подсчета данных с сайта https://fitseven.ru/zdorovie/metabolism/sutochnaya-norma-kaloriy
    } else {
        result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);//округлили значения
    }
  }
  
  calcTotal();

  function initLocalSettings(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(elem => {//переберем каждый элемент
        elem.classList.remove(activeClass);//удалим класс актвиности
        if (elem.getAttribute('id') === localStorage.getItem('sex')) {//создаем условие;обращаемся к атрибуту элемента и если он будет строго равен значению из localStorage
            elem.classList.add(activeClass);//даннуму div (элементу) мы назначим класс активности
        }
        if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')){
            elem.classList.add(activeClass);
        }
    });
  }

  initLocalSettings('#gender div','calculating__choose-item_active');
  initLocalSettings('.calculating__choose_big div','calculating__choose-item_active');

  function getStaticInformation(selector, activeClass) {
     const elements = document.querySelectorAll(selector);//внутри родителя будем получать все дивы
     
     elements.forEach(elem => {
        elem.addEventListener('click', (e) => {//используем делегирование события
            if (e.target.getAttribute('data-ratio')) {//если такой атрибут присутствует у объекта события
                ratio = +e.target.getAttribute('data-ratio');// то мы устанавливаем переменную ratio для которой вытаскиваем e.target(физ.активность)
                localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));//сохраняем значения введеные пользователем
            } else {
                sex = e.target.getAttribute('id');//когда условие не сработает, то получаем id пола
                localStorage.setItem('sex', e.target.getAttribute('id'));//сохраняем значения введеные пользователем
            }
    
            elements.forEach(elem => {
                elem.classList.remove(activeClass);//убираем класс активности у всех эелементов 
            });
    
            e.target.classList.add(activeClass);//назначаем класс активности тому, который нужен
    
            calcTotal();
         });
     });
  }
  
  getStaticInformation('#gender div','calculating__choose-item_active');
  getStaticInformation('.calculating__choose_big div','calculating__choose-item_active');

  function getDynamicInformation(selector) {//функция будет обрабатывать каждый отдельный input строка:(ваша конституция)
    const input = document.querySelector(selector);//получаем input, который ввел пользователь в поле

    input.addEventListener('input', () =>{//навесим обработчик события input, чтобы отследить ввод данных в поле от пользователя
       
        if (input.value.match(/\D/g)){//применим регулярное выражение, где глобально установили класс not digets(не цифры) - это наше условие
            input.style.border = '1px solid red';//подсвечивает красным, если вводят в инпут буквы
        } else {
            input.style.border = 'none';// иначе без подсвечивания
        }
       
        switch(input.getAttribute('id')){//запустим метод switch case, который проверит соовтетствие строки
            case 'height'://если это действительно input с ростом то
                height = +input.value;//берем эту переменную и записываем в неё значение, которое ввел пользователь
                break;//остановили
            case 'weight':
                weight = +input.value;
                break;
            case 'age':
                age = +input.value;
                break;
       }   

       calcTotal();
    });

  }

  getDynamicInformation('#height');
  getDynamicInformation('#weight');
  getDynamicInformation('#age');
}

module.exports = calc;

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((module) => {

function cards (){
     //Используем классы для карточек
     class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes){
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 97;
            this.changeToRUB();
        }
    //Методы
    
        changeToRUB() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');
            
            if(this.classes.length === 0) {//обращаемя к количесву элементов в массиве, если длина = 0, то
                this.classes = 'menu__item';//перезаписываем пустой элемент массива
                element.classList.add(this.classes);//то вставим дэфолтный класс
            }else{//иначе будет запускаться следующая строка
                this.classes.forEach(className => element.classList.add(className));
            }//Реализация защиты от дурака, чтобы сохранить стоковый вид объекта
            
            element.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                    </div>
                `;
            this.parent.append(element);
        }
    }

    const getResource = async (url) => {
        const res = await fetch(url);

        if(!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();// возвращаем промис(трансформирует в json)
    };

    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {//деструктуризировать на несколько частей
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });

        // getResource('http://localhost:3000/menu')
    //     .then(data => createCard(data)); // обращаемся к функции с датой

    // function createCard(data) {// дата - массив
    //     data.forEach(({img, altimg, title, descr, price}) => { //перебераем массив, деструкторизируем объекты на отдельные свойства
    //         const element = document.createElement('div');// создаем новый див

    //         element.classList.add("menu__item");// помещаем в новый класс

    //         element.innerHTML = `// формирует верстку и вов внутрь помещает свойства пришедшие от сервера ${img}...
    //             <img src=${img} alt=${altimg}>
    //             <h3 class="menu__item-subtitle">${title}</h3>
    //             <div class="menu__item-descr">${descr}</div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //             </div>
    //         `;
    //         document.querySelector(".menu .container").append(element);// и аппендит карточку в какой нибудь элемент на странице
    //     });
    // }
}

module.exports = cards;

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((module) => {

function modal(){
    //Modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),
            modal = document.querySelector('.modal');

    modalTrigger.forEach(btn => {//Перебераем
        btn.addEventListener('click', openModal);//открытие модального окна
    });

    function closeModal () {
    modal.classList.add('hide');
    modal.classList.remove('show');
    // modal.classList.toggle('show');//другой способ
    document.body.style.overflow = '';//страница приходит в исходное положение после закрытие модального окна
    }

    function openModal() {
        modal.classList.add('show');//показать окно
        modal.classList.remove('hide');//скрыть окно
        // modal.classList.toggle('show');//другой способ
        document.body.style.overflow = 'hidden';//основная страница фиксирована при появлении модального окна
        clearInterval(modalTimerId);//очищаем интервал
        }//смещение кода Tab + Shift; сместить в право Tab (для себя инфа)   
        
    modal.addEventListener('click', (e) => {
         if (e.target === modal || e.target.getAttribute('data-close') == "") {
           closeModal();
         }  
    });//обработчик события клика, который закрывает модальное окно при клике в область страницы

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 50000); //автоматический вызов модального окана
    // коммент чтобы не всплывало, но перестает работать удаление модального окна после прокрутки вниз страницы, окно постоянно высплывает.
    function showModalByScroll() {
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }  

    window.addEventListener('scroll', showModalByScroll);

}

module.exports = modal;

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((module) => {

function slider(){
    //Slider

    const slides = document.querySelectorAll('.offer__slide'),
         slider =document.querySelector('.offer__slider'),
         prev = document.querySelector('.offer__slider-prev'),
         next = document.querySelector('.offer__slider-next'),
         total = document.querySelector('#total'),//получим элемент
         current = document.querySelector('#current'),//получим элемент - блок слайда
         slidesWrapper = document.querySelector('.offer__slider-wrapper'),//главная обертка
         slidesField = document.querySelector('.offer__slider-inner'),//поле со слайдами
         width = window.getComputedStyle(slidesWrapper).width;//вытаскиваем из элемента ширину


    let slideIndex = 1;//создаем индекс и подразумеваем - переменная будет меняться
    let offset = 0;//отступ

      if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    }else{
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0,5s all';
    
    slidesWrapper.style.overflow = 'hidden';
    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';//устанавливаем позишн релатив

    const indicators = document.createElement('ol'),//обертка всех точек с последующей стилизацией; ol - order list
         dots = [];//истинный массив не псевдо 

    indicators.classList.add('carousel-indicators');//назначим класс для индикатора, которого еще нет в css, но чтобы он был на элементе 
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;//навешиваем css style
    slider.append(indicators);// поместить обертку во внутрь слайдера

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');//содаем точки; li - list item
        dot.setAttribute('data-slide-to', i + 1);//создаем атрибут первая точка идет к первому слайду
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;//навешиваем css стили; по другому можно создать класс и добавить в него все эти стили
        if (i == 0) {
            dot.style.opacity = 1;//активировали точку положение 1
        }
        indicators.append(dot);//зааппендили точку на страницу
        dots.push(dot);//помещаем зааппенденную точку в массив(массив с точками)
    }//блок кода, который согласно количеству слайдов создает соответсвующее кол-во точек

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }

    next.addEventListener('click', () => {
        if(offset == deleteNotDigits(width) * (slides.length - 1)){//'500px'
            offset = 0;
        } else {
            offset += deleteNotDigits(width);//смещение слайда
        }
       
        slidesField.style.transform =`translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }
        
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = '.5');//берем массив дотс и перебераем через forEach делая не активные точки прозрачными на 50%
        dots[slideIndex - 1].style.opacity = 1;//устанавливает почти не прозрачную активную точку
    });

    prev.addEventListener('click', () => {
        if(offset == 0){//'500px'
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width);//смещение слайда
        }
        
        slidesField.style.transform =`translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }
       
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    });

    dots.forEach(dot => {//вновь переберем дотс
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

          slideIndex = slideTo;// тыкнули на 4 и slideIndex будет 4
          offset = deleteNotDigits(width) * (slideTo - 1);//здесь нужно умножить общую ширину не на к-во слайдов, а на slideTo

          slidesField.style.transform =`translateX(-${offset}px)`;//сделаем смещение 

          if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

          dots.forEach(dot => dot.style.opacity = '.5');
          dots[slideIndex - 1].style.opacity = 1;
        });
    });

    // showSlides(slideIndex);//инициализация нужной нам структуры показа слайдов

    // if (slides.length < 10) {
    //     total.textContent = `0${slides.length}`;
    // }else{
    //     total.textContent = slides.length;
    // }

    // function showSlides(n) {
    //     if (n > slides.length){
    //         slideIndex = 1;
    //     }

    //     if (n < 1) {
    //         slideIndex = slides.length;
    //     }//блок кода выполняет зацикливание прокрутку слайдов
    //     slides.forEach(item => item.style.display = 'none');//скрываем слайды

    //     slides[slideIndex - 1].style.display = 'block';//показываем активный слайд

    //     if (slides.length < 10) {
    //         current.textContent = `0${slideIndex}`;
    //     }else{
    //         current.textContent = slideIndex;
    //     }// теперь будет изменяться слай и счетчик номера показа слайда
    // }

    // function plusSlides(n) {
    //     showSlides(slideIndex += n);//шагам по слайдам в увеличение
    // }

    // prev.addEventListener('click', () => {//назначаем обработчик события 'click'
    //     plusSlides(-1);// пролистывание на предыдущий слайд
    // });

    // next.addEventListener('click', () => {//назначаем обработчик события 'click'
    //     plusSlides(1);// пролистывание на следующий слайд
    // });
}

module.exports = slider;

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

function tabs(){
    //Tab

    const tabs = document.querySelectorAll('.tabheader__item'),//пременная с перебором класса табов
    tabsContent = document.querySelectorAll('.tabcontent'),//переменная с перебором класса контента
    tabsParent = document.querySelector('.tabheader__items');//переменнная родитель с перебором класса табов, нужно получить один элемент поэтому без All

    function hideTabContent() {//создаем функцию скрыть все не нужные табы   
        tabsContent.forEach(item => {//Так как псевдомассив его нужно перебрать
            item.classList.add('hide');
            item.classList.remove('show', 'fade');// удаляем классы при переключении таба
        });

    tabs.forEach(item => {//перебором у каждого таба удоляяем класс активности
        item.classList.remove('tabheader__item_active');
        });
    }    
    
    function showTabContent(i = 0) {//функция показвает нам табы
        tabsContent[i].classList.add('show', 'fade');//у выбранного элемента подключаем класс show и эффект класса fade
        tabsContent[i].classList.remove('hide');//у выбранного элемента таба удаляем класс hide
        tabs[i].classList.add('tabheader__item_active');//добавляем класс табу
    }

    hideTabContent();//Вызов функции скрыть
    showTabContent();//Вызов функции показать

    tabsParent.addEventListener('click', function(event) {//делигирование события; добавляем обработчик события клика пользователя
        const target = event.target;//применяем переменную, чтобы упростить вызов это конструкции

        if (target && target.classList.contains('tabheader__item')){//проверяем точное нажатие на таб
            tabs.forEach((item, i) => {//переберем все табы, которые лежат в переменной tabs и будем сравнивать совпадает нажатие пользователя с элементом псевдомассива tabs
                if (target == item) {
                    hideTabContent();
                    showTabContent(i); 
                }
            });
        }
    });    
}

module.exports = tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((module) => {

function timer(){
    //Timer

    const deadLine = '2024-05-20';

    function getTimeRemaining(endtime){
        const t = Date.parse(endtime) - Date.parse(new Date()),//разница дедлайна от текущей даты
                days = Math.floor(t / (1000 * 60 * 60 * 24)),//получаем к-во дней
                hours = Math.floor((t / (1000 * 60 * 60) % 24)),//возвращаем остаток от деления и получаем часы
                minutes = Math.floor((t / 1000 / 60) % 60),
                seconds = Math.floor((t / 1000) % 60);
                
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
 }

 function getZero(num){
    if(num >= 0 && num < 10) {
        return `0${num}`;
    }else{
        return num;
    }
 }
 
  function setClock(selector, endtime) {
     
    const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);
        
        updateClock();
    
     function updateClock() {
        const t = getTimeRemaining(endtime);

        days.innerHTML = getZero(t.days);
        hours.innerHTML = getZero(t.hours);
        minutes.innerHTML = getZero(t.minutes);
        seconds.innerHTML = getZero(t.seconds);

        if (t.total <= 0){
            clearInterval(timeInterval);
        }
    }

 }

    setClock('.timer', deadLine);
}

module.exports = timer;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
window.addEventListener('DOMContentLoaded', () =>{//назначение глобального обработчика событий
    const tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
          modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js"),
          timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js"),
          cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js"),
          forms = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module './modaules/forms'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())),
          slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js"),
          calc = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");

    tabs();
    modal();
    timer();
    cards();
    forms();
    slider();
    calc();
});//импортируем все кусочки кода
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map