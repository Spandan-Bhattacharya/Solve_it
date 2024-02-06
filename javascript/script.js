const openMenu = document.querySelector('.openMenu');
const mainMenu = document.querySelector('.mainMenu');
const bars =   document.querySelector('#bar');
const list = document.querySelector('.list');
const body = document.querySelector('body');

openMenu.addEventListener('click' , ()=>{
    list.classList.toggle('move');
    body.classList.toggle('scroll');
})


document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('input-box');
    const cards = document.querySelectorAll('.box');
  
    searchInput.addEventListener('input', function (event) {
      const searchText = event.target.value.toLowerCase();
      cards.forEach(function (card) {
        const cardText = card.textContent.toLowerCase();
        if (cardText.includes(searchText)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
  