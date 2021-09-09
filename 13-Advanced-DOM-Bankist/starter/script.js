'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
//LETCURES
//############SELECTING ELEMENTS##############
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
const allSelections = document.querySelectorAll('.section'); //RETRUN NODE LIST, THAT LATER CAN BE CONVERTED TO ACTUAL ARRAY TO ENTERTAIN ALL ARRAY METHODS
console.log(document.getElementById('section--1'));
console.log(document.getElementsByClassName('btn'));
const allButns = document.getElementsByTagName('button'); //RETURN COLLECTION THAT UPDATED ON THE FLY ON DOM

//##############CREATING ELEMENTS##################
const messae = document.createElement('div'); //JUSST CREATING OBJ NOT TO DISPLAY
messae.classList.add('cookie-message'); //STYLING CREATED OBJECT
// messae.textContent = 'we use cookies to improve web loading and analytics'; //ADDING TEXT ONLY TO THAT OBJECT
messae.innerHTML = `we use cookies to improve web loading and analytics. <button class="btn btn--close-cookie">Got it!</button>`; //ADDING TEXT & HTML TO THE OBJECT

//##########INSERT ELEMENTS INTO THE DOM NOTE: ELEMENTS ARE UNIQUE OBJECTS ON THE DOM ##############
// header.prepend(messae); //as first child of the selected element
// header.append(messae); //as last child of the selected element
// header.append(messae.cloneNode(true)); //cloning multiple object
header.before(messae); //as siblings
// header.after(messae); //as siblings
// header.insertAdjacentHTML('afterend', messae);
/*
targetElement.insertAdjacentElement(position, element);
Positions = {
'beforebegin': Before the targetElement itself.
'afterbegin': Just inside the targetElement, before its first child.
'beforeend': Just inside the targetElement, after its last child.
'afterend': After the targetElement itself.
}
*/

//##########DELETE ELEMENTS FROM DOM############
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    messae.remove();
    // messae.parentElement.removeChild(messae); //OLD STYLE OF DELETING ELEMENT
  });

//STYLING ELEMENTS##############################
//inline styles
messae.style.backgroundColor = 'gray';
messae.style.width = '120%';
//GetComputedStyle, styles which not delcared in css style sheet
//styles computed by browser as element displayed on screen

console.log(getComputedStyle(messae).color);
console.log(getComputedStyle(messae).height);
messae.style.height =
  Number.parseFloat(getComputedStyle(messae).height, 10) + 40 + 'px';
