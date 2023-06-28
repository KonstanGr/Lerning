/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

'use strict';

document.addEventListener('DOMContentLoaded', () => {//обратились к доку; навесили обработчик события; само сабытие, теперь js срабатывает после прогрузки структуры дом - дерево.
 
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };
    
    
    
    const adv = document.querySelectorAll('.promo__adv img'),
        poster = document.querySelector('.promo__bg'),
        genre = poster.querySelector('.promo__genre'),
        movieList = document.querySelector('.promo__interactive-list'),
        addForm = document.querySelector('form.add'),//получаем форму
        addInput = addForm.querySelector('.adding__input'),//Элементы внутри формы
        checkbox = addForm.querySelector('[type="checkbox"]');//Элемент гаочка "любимый фильм"
    
    addForm.addEventListener('submit', (event) => {
        event.preventDefault();//Отменяет станадртное поведение браузера;

        let newFilm = addInput.value;
        const favorite = checkbox.checked;

        if (newFilm) {

            if(newFilm.length > 21){
                newFilm = `${newFilm.substring(0, 22)}...`;//Ограничивает длину названия фильма; Ограничевает добавление пустых строк в список, по нажатию кнопки ПОДТВЕРДИТЬ;Задание 1.
            }

            if (favorite) {
                console.log("Добавляем любимый фильм");// Выводит в консоль;Задание 4.
            }

            movieDB.movies.push(newFilm);//Добавляем новый фильм в MovieDB;
            sortArr(movieDB.movies);//Сортируем названия;
    
            creatMovieList(movieDB.movies, movieList);//перебераем фильмы, после помещаем перебранные фильмы в parent;
        }  
       
        event.target.reset();//Сброс формы;

    });

    const deleteAdv = () =>{
        adv.forEach (item =>{
            item.remove();
    });
    };//Функция удаления рекламы;

    const sortArr = (arr) => {
arr.sort();//Функция сортировки;
    };

    const makeChanges = () => {
        genre.textContent = "драма";
        poster.style.backgroundImage = 'url("img/bg.jpg")';
    };//Функция изменения заднего фона и жанара;
 
    function creatMovieList (films, parent) {
        parent.innerHTML = "";
        sortArr(films);

        films.forEach((film, i)=>{
            parent.innerHTML += `<li class="promo__interactive-item">${i + 1} ${film}
            <div class="delete"></div>
        </li>`;
        });//Функционал по созданию новых элементов фильмов;

        document.querySelectorAll('.delete').forEach((btn, i) =>{//Получаем корзинки; Перебераем, чтобы навесить на разные элементы одно и тоже событие ForEach куда помещаем колбэк функцию: корзина, нумерация;
            btn.addEventListener('click', () =>{//Обработчик события клика;
                btn.parentElement.remove();//Удаляем со страницы (с perenta);
                movieDB.movies.splice(i, 1);//Удаляем из БД; номер/к-во элементов;

                creatMovieList(films, parent);//Рекурсия; для того чтобы список заного перестраивался;
            });//Задание 3.
        });
    }


    deleteAdv(adv);
    makeChanges();
    
    creatMovieList(movieDB.movies, movieList);
//В конце идут вызовы функций;
});
