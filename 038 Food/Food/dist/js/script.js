window.addEventListener('DOMContentLoaded', () =>{//назначение глобального обработчика событий

    //Tab
    let tabs = document.querySelectorAll('.tabheader__item'),//пременная с перебором класса табов
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

   
    // Forms

    const forms = document.querySelectorAll('form');//получаем все формы

    const message = {//объект с свойствми сообщений при различных ситуациях
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item =>{
        bindPostData(item);//обрабатываем события
    });

    const postData = async (url, data) => {//postData настраивает запрос
        let res = await fetch(url, {//postData посылает запрос на сервер
            method: "POST",
            headers: {
                'Content-type': 'application/json'
             },
            body: data 
        });

        return await res.json();// возвращаем промис(трансформирует в json)
    };

    function bindPostData(form) {//функция постинг данных
        form.addEventListener('submit', (e) => {//добавим обработчик события отправки формы заполенения по нажатию "отправить"
            e.preventDefault();//отменить стандартное поведение браузера, чтобы не перезагружался после отправки формы клиентом

            let statusMessage = document.createElement('img');//создаем новый динамический блок на странице HTML
            statusMessage.src = message.loading;//создали изображение подставили атрибут src
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
        `;//помещаем сообщение, которое хотим показать; работает когда у клиента медленный интернет
//form.append(statusMessage);//выводить сообщение на форме
            form.insertAdjacentElement('afterend', statusMessage);//чтобы спинер запускался после формы        
 
            const formData = new FormData(form);//сбор данных из form

            const json = JSON.stringify(Object.fromEntries(formData.entries()));//formData (инфа с формы) помещаем в массив массивов дальше в классический объект дальше в JSON

            postData('http://localhost:3000/requests', json)//отправляем json на сервер
            .then(data => {
                console.log(data);
                showThanksModal(message.success);//сообщение об успешной операции
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);//выводим сообщение об ошибке
            }).finally(() => {
                form.reset();//очищаем форму
            });
 
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');//получим блок и поместим в переменную

        prevModalDialog.classList.add('hide');//скроем предыдущий контент
        openModal();//функция отвечает за открытие модальных окон


        const thanksModal = document.createElement('div');//начинаем создавать блок нового контента
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `; 

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {//используем асинхронную операцию
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();//закроем модальное окно
        }, 4000);  
    }

    // fetch('https://jsonplaceholder.typicode.com/posts', {
    //     method: "POST",
    //     body: JSON.stringify({name: 'Konsta'}),
    //     headers: {
    //         'Content-type': 'application/json'
    //     }
    // })
    //   .then(response => response.json())//возвращает промис
    //   .then(json => console.log(json));
    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res));
    
        
    //Slider

    const slides = document.querySelectorAll('.offer__slide'),
         slider =document.querySelector('.offer__slider'),
         prev = document.querySelector('.offer__slider-prev'),
         next = document.querySelector('.offer__slider-next'),
         total = document.querySelector('#total'),//получим элемент
         current = document.querySelector('#current'),//получим элемент - блок слайда
         slidesWrapper = document.querySelector('offer__slider-wrapper'),//главная обертка
         slidesField = document.querySelector('offer__slider-inner'),//поле со слайдами
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

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
         dots = [];

    indicators.classList.add('carousel-indicators');
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
    `;
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slite-to', i + 1);
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
        `;
        if (i == 0) {
            dot.style.opacity = 1;//активировали точку положение 1
        }
        indicators.append(dot);//зааппендили точку на страницу
        dots.push(dot);
    }


    next.addEventListener('click', () => {
        if(offset == +width.slice(0, width.length - 2) * (slides.length - 1)){//'500px'
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2);//смещение слайда
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

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    });

    prev.addEventListener('click', () => {
        if(offset == 0){//'500px'
            offset = +width.slice(0, width.length - 2) * (slides.length - 1);
        } else {
            offset -= +width.slice(0, width.length - 2);//смещение слайда
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

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

          slideIndex = slideTo;
          offset = +width.slice(0, width.length - 2) * (slideTo - 1);

          slidesField.style.transform =`translateX(-${offset}px)`;

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
});

