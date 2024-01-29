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
        
});

