const btns = document.querySelectorAll('button'),
    overlay = document.querySelector('.overlay');



// btn.onclick = function(){
//     alert('Click');
// };

let i = 0;
const deleteElement = (e) => {
    console.log(e.target);
    console.log(e.type);
    // i++;
    // if (i == 1){
    //     btn.removeEventListener('click', deleteElement);
    // }
    // e.target.remove();
};

// btn.addEventListener('click', deleteElement);
// overlay.addEventListener('click', deleteElement);

btns.forEach(btn => {
    btn.addEventListener('click', deleteElement, {once: true});
});

// btn.addEventListener('mouseenter', (e) =>{
//     console.log(e.target);
//     e.target.remove();
// });


const link = document.querySelector('a');

link.addEventListener('click', function(event){
    event.preventDefault();

    console.log(event.target);
});

