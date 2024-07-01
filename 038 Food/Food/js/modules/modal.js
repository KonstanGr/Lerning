function closeModal (modalSelector) {
        const modal = document.querySelector(modalSelector);
        
        modal.classList.add('hide');
        modal.classList.remove('show');
        // modal.classList.toggle('show');//другой способ
        document.body.style.overflow = '';//страница приходит в исходное положение после закрытие модального окна
    }

function openModal(modalSelector, modalTimerId) {
        const modal = document.querySelector(modalSelector);
        
        modal.classList.add('show');//показать окно
        modal.classList.remove('hide');//скрыть окно
        // modal.classList.toggle('show');//другой способ
        document.body.style.overflow = 'hidden';//основная страница фиксирована при появлении модального окна
        
        //console.log(modalTimerId);
        if (modalTimerId){
            clearInterval(modalTimerId);
        }
        //clearInterval(modalTimerId);//очищаем интервал
}//смещение кода Tab + Shift; сместить в право Tab (для себя инфа)  

function modal(triggerSelector, modalSelector, modalTimerId){

    const modalTrigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector);

    modalTrigger.forEach(btn => {//Перебераем
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));//открытие модального окна
    });
 
    modal.addEventListener('click', (e) => {
         if (e.target === modal || e.target.getAttribute('data-close') == "") {
           closeModal(modalSelector);
         }  
    });//обработчик события клика, который закрывает модальное окно при клике в область страницы

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });
         
    function showModalByScroll() {
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }  

    window.addEventListener('scroll', showModalByScroll);

}

export default modal;
export {closeModal};
export {openModal};