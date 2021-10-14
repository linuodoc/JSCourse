'use strict';

/**
Coding Challenge #2
For this challenge you will actually have to watch the video! Then, build the image
loading functionality that I just showed you on the screen.
Your tasks:
Tasks are not super-descriptive this time, so that you can figure out some stuff by
yourself. Pretend you're working on your own 😉

PART 1>>>
1. Create a function 'createImage' which receives 'imgPath' as an input.
This function returns a promise which creates a new image (use
document.createElement('img')) 
and sets the .src attribute to the
provided image path
2. When the image is done loading, append it to the DOM element with the
'images' class, and resolve the promise. The fulfilled value should be the
image element itself. In case there is an error loading the image (listen for
the'error' event), reject the promise
3. If this part is too tricky for you, just watch the first part of the solution


PART 2>>>
4. Consume the promise using .then and also add an error handler
5. After the image has loaded, pause execution for 2 seconds using the 'wait'
function we created earlier
6. After the 2 seconds have passed, hide the current image (set display CSS
property to 'none'), and load a second image (Hint: Use the image element
returned by the 'createImage' promise to hide the current image. You will
need a global variable for that 😉)
7. After the second image has loaded, pause execution for 2 seconds again
8. After the 2 seconds have passed, hide the current image
Test data: Images in the img folder. Test the error handler by passing a wrong
image path. Set the network speed to “Fast 3G” in the dev tools Network tab,
otherwise images load too fast

GOOD LUCK 😀
 */

const imgContainer = document.querySelector('.images');
let currentImage;

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  }).then(() => console.log('2 sec image loaded'));
};

const createImage = function (imgPath) {
  return new Promise(function (resolve) {
    const img = document.createElement('img');
    img.src = imgPath;
    imgContainer.appendChild(img);
    resolve(img);
  });
};
const loadimg = function () {
  createImage('./img/img-4.jpg')
    .then(img => {
      console.log(img);
      currentImage = img;
      return wait(2);
    })
    .then(() => {
      currentImage.style.display = 'none';
      return createImage('./img/img-3.jpg');
    })
    .then(img => {
      console.log(img);
      currentImage = img;
      return wait(2);
    })
    .then(() => {
      currentImage.style.display = 'none';
      return createImage('./img/img-2.jpg');
    })
    .then(img => console.log(img))
    .catch(err => console.error(err));
};
// loadimg();
/**
 * Coding Challenge #3
Your tasks:
PART 1
1. Write an async function 'loadNPause' that recreates Challenge #2, this time
using async/await (only the part where the promise is consumed, reuse the
'createImage' function from before)
2. Compare the two versions, think about the big differences, and see which one
you like more
3. Don't forget to test the error handler, and to set the network speed to “Fast 3G”
in the dev tools Network tab

PART 2
1. Create an async function 'loadAll' that receives an array of image paths
'imgArr'
2. Use .map to loop over the array, to load all the images with the
'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'parallel' class to all the images (it has some CSS styles)
Test data Part 2: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-
3.jpg']. To test, turn off the 'loadNPause' function

GOOD LUCK 😀
 */

const imgArr = [
  './img/img-1.jpg',
  './img/img-2.jpg',
  './img/img-3.jpg',
  './img/img-4.jpg',
];

const loadNPause = async function (imgPath) {
  try {
    const img = await createImage(imgPath);
    console.log(img);
  } catch (error) {
    console.error(err);
  }
};
// loadNPause('./img/img-1.jpg');

const loadAll = async function (imgArr) {
  const images = imgArr.map(img => {
    createImage(img);
  });
  Promise.all(images).then(img => console.log(img));
  console.log(images);
};
loadAll(imgArr);

//     console.log(img);
//     currentImage = img;
//     return wait(2);
//   })
//   .then(() => {
//     currentImage.style.display = 'none';
//     return createImage('./img/img-3.jpg');
//   })