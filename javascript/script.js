const openMenu = document.querySelector('.openMenu');
const mainMenu = document.querySelector('.mainMenu');
const bars =   document.querySelector('#bar');
const list = document.querySelector('.list');
const body = document.querySelector('body');

openMenu.addEventListener('click' , ()=>{
    list.classList.toggle('move');
    body.classList.toggle('scroll');
})
