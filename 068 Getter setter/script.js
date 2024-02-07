'use strict';

const person = {
    name: "Alex",
    age: 25,

    get userAge() {
        return this.age;
    },//геттер

    set userAge(num){
        this.age = num;
    }//сеттор
};

console.log(person.userAge = 30);//вызов сеттора с новым значением
console.log(person.userAge);//вызов геттера

//геттор взаимосвязан с сеттером