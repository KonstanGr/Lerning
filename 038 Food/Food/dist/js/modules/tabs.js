function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
   
    //Tab
    let tabs = document.querySelectorAll(tabsSelector),//пременная с перебором класса табов
    tabsContent = document.querySelectorAll(tabsContentSelector),//переменная с перебором класса контента
    tabsParent = document.querySelector(tabsParentSelector);//переменнная родитель с перебором класса табов, нужно получить один элемент поэтому без All

    function hideTabContent() {//создаем функцию скрыть все не нужные табы
        tabsContent.forEach(item => {//Так как псевдомассив его нужно перебрать
            item.classList.add('hide');
            item.classList.remove('show', 'fade');// удаляем классы при переключении таба
        });

    tabs.forEach(item => {//перебором у каждого таба удаляем класс активности
        item.classList.remove(activeClass);
        });
    }    
    
    function showTabContent(i = 0) {//функция показвает нам табы
        tabsContent[i].classList.add('show', 'fade');//у выбранного элемента подключаем класс show и эффект класса fade
        tabsContent[i].classList.remove('hide');//у выбранного элемента таба удаляем класс hide
        tabs[i].classList.add(activeClass);//добавляем класс табу
    }

    hideTabContent();//Вызов функции скрыть
    showTabContent();//Вызов функции показать

    tabsParent.addEventListener('click', function(event) {//делигирование события; добавляем обработчик события клика пользователя
        const target = event.target;//применяем переменную, чтобы упростить вызов это конструкции

        if (target && target.classList.contains(tabsSelector.slice(1))) {//проверяем точное нажатие на таб
            tabs.forEach((item, i) => {//переберем все табы, которые лежат в переменной tabs и будем сравнивать совпадает нажатие пользователя с элементом псевдомассива tabs
                if (target == item) {
                    hideTabContent();
                    showTabContent(i); 
                }
            });
        }
    });    
}

export default tabs;
