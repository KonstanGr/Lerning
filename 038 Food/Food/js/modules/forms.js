import { closeModal, openModal } from "./modal";
import {postData} from '../services/services';

function forms(formSelector, modalTimerId){
    // Forms

    const forms = document.querySelectorAll(formSelector);//получаем все формы

    const message = {//объект с свойствми сообщений при различных ситуациях
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item =>{
        bindPostData(item);//обрабатываем события
    });



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
        openModal('.modal', modalTimerId);//функция отвечает за открытие модальных окон


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
            closeModal('.modal');//закроем модальное окно
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
    
    // fetch('http://localhost:3000/menu')
    //     .then(data => data.json())
    //     .then(res => console.log(res));
}

export default forms;