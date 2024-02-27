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