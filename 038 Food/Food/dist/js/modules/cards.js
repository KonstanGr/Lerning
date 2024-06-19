import {getResource} from '../services/services';

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

export default cards;