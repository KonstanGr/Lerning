function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}){
    //Slider

    let slideIndex = 1;//создаем индекс и подразумеваем - переменная будет меняться
    let offset = 0;//отступ

    const slides = document.querySelectorAll(slide),
         slider =document.querySelector(container),
         prev = document.querySelector(prevArrow),
         next = document.querySelector(nextArrow),
         total = document.querySelector(totalCounter),//получим элемент
         current = document.querySelector(currentCounter),//получим элемент - блок слайда
         slidesWrapper = document.querySelector(wrapper),//главная обертка
         slidesField = document.querySelector(field),//поле со слайдами
         width = window.getComputedStyle(slidesWrapper).width;//вытаскиваем из элемента ширину

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

export default slider;