'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnOpenModal = document.querySelectorAll('.show-modal');
const btnCloseModal = document.querySelector('.close-modal');
// console.log(btnOpenModal);

const modalOpen = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
const modalClose = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (var i = 0; i < btnOpenModal.length; i++) {
  btnOpenModal[i].addEventListener('click', modalOpen);
  btnCloseModal.addEventListener('click', modalClose);
  overlay.addEventListener('click', modalClose);
}
document.addEventListener('keydown', function (e) {
  console.log(e.key);
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    modalClose();
  }
});
