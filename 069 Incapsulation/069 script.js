'use strict';

class User {//создаемкласс
    constructor(name, age) {
        this.name = name;//свойства
        this._age = age;//
    }

    #surname = 'Petrychenko';//приватное свойство #

    say = () => {
        console.log(`Имя пользователя: ${this.name} ${this.#surname}, возраст ${this._age}`);
    }

    get age() {
        return this._age;
    }

    set age(age) {
        if (typeof age === 'number' && age > 0 && age < 110) {
            this._age = age;
        } else {
            console.log('Недопустимое значение!');
        }
    }
}

const ivan = new User('Ivan', 27);
