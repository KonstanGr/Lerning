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

export default calc;