'use strict';

//LETCURES
//############SELECTING ELEMENTS##############
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
//RETRUN NODE LIST, LATER CAN BE CONVERTED TO ACTUAL ARRAY WITH ARRAYs METHODS
const allSelections = document.querySelectorAll('.section');
console.log(document.getElementById('section--1'));
console.log(document.getElementsByClassName('btn'));
const allButns = document.getElementsByTagName('button'); //RETURN COLLECTION THAT UPDATED ON THE FLY ON DOM

//##############CREATING ELEMENTS##################
const messae = document.createElement('div'); //JUSST CREATING OBJ NOT TO DISPLAY
messae.classList.add('cookie-message'); //STYLING CREATED OBJECT
// messae.textContent = 'we use cookies to improve web loading and analytics'; //ADDING TEXT ONLY TO THAT OBJECT
messae.innerHTML = `we use cookies to improve web loading and analytics. <button class="btn btn--close-cookie">Got it!</button>`; //ADDING TEXT & HTML TO THE OBJECT

//##########INSERT ELEMENTS INTO THE DOM NOTE: ELEMENTS ARE UNIQUE OBJECTS ON THE DOM ##############
header.prepend(messae); //as first child of the selected element
// header.append(messae); //as last child of the selected element
// header.append(messae.cloneNode(true)); //cloning multiple object
// header.before(messae); //as siblings
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

//non standard property can be changed as followin
document.documentElement.style.setProperty('--color-primary', 'orangered');

//ATTRIBUTE###################
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.className);
console.log(logo.designer); //non standard attribute retrun undefiend
// Use .getAttribute('att_name') for non standard attribute
console.log(logo.getAttribute('designer'));

console.log(logo.src); //absolute
console.log(logo.getAttribute('src')); //relative

// const link = document.querySelector('.twitter-link');
const link = document.querySelector('.nav__link--btn');
console.log(link.href);
console.log(link.getAttribute('href'));

// Data Attributes
console.log(logo.dataset.versionNumber);

//CLASES
logo.classList.add('c', 'd'); //pass multiple classes
logo.classList.remove('c');
logo.classList.toggle('c');
logo.classList.contains('c');
//don't use , as it will overide all exisiting clasess
logo.className = 'jonas';

console.clear();
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

///////////////////////////////////////
// Modal window
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

///////////////////////////////////////
// Button scrolling
btnScrollTo.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' });
  btnScrollTo.removeEventListener('click', btnScrollTo);
});

///////////////////////////////////////
// event Propgation 3 phases : CAPTURING, TARGET , BUBBLING
//rgb(255,255,255)
const randomInt = (max, min) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('LINK:', e.target, e.currentTarget);
  console.log(e.currentTarget === this);
});

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('LINKs:', e.target, e.currentTarget);
//   console.log(e.currentTarget === this);
// });
// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('NAV:', e.target, e.currentTarget);
//   console.log(e.currentTarget === this);
// });

///////////////////////////////////////
// Page navigation
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

//EVENT DELEGATION
// 1. Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});
console.clear();
///////////////////////////////////////
// Tabbed component

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  // Guard clause
  if (!clicked) return;

  // Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Activate tab
  clicked.classList.add('operations__tab--active');

  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});
