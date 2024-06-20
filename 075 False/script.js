'use strict';

try {
    console.log('Normal');
    console.log(a);
    console.log('result');
} catch(error) {
    console.log(error);
    console.log(error.message);
    console.log(error.stack);
} finally {
    
}

console.log('Still normal');