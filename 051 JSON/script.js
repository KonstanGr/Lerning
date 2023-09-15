'use strict';

const persone = {
    name: 'Alex',
    tel: '+74444444',
    parents:{
        mom: 'Olga',
        dad: 'Mike'
    }
};

const clone = JSON.parse(JSON.stringify(persone));
clone.parents.mom = 'Ann';
console.log(persone);
console.log(clone);