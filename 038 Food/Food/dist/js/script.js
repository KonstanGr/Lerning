window.addEventListener('DOMContentLoaded', () =>{//назначение глобального обработчика событий

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

    tabsParent.addEventListener('click', (event) => {//делигирование события; добавляем обработчик события клика пользователя
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
            modal = document.querySelector('.modal'),
            modalCloseBtn = document.querySelector('[data-close]');//закрыть модальное окно

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
    
    modalCloseBtn.addEventListener('click', closeModal);//закрытие моадльного окна
         
    
    modal.addEventListener('click', (e) => {
         if (e.target === modal) {
           closeModal();
         }  
    });//обработчик события клика, который закрывает модальное окно при клике в область страницы

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });

    // const modalTimerId = setTimeout(openModal, 3000); //автоматический вызов модального окана
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
                this.element = 'menu__item';//перезаписываем пустой элемент массива
                element.classList.add(this.element);//то вставим дэфолтный класс
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

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        ".menu .container",
        'menu__item',
        'big'
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        14,
        ".menu .container",
        'menu__item'
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        21,
        ".menu .container",
        'menu__item'
    ).render();
});

