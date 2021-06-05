'use strict';

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;
    const divElem = document.querySelector('div.images');

    img.addEventListener('load', function () {
      divElem.appendChild(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

createImage('./img/img-1.jpg')
  .then(img => {
    wait(2)
      .then(() => {
        img.style.display = 'none';
        return createImage('./img/img-2.jpg');
      })
      .then(img => {
        wait(2).then(() => {
          img.style.display = 'none';
          return createImage('./img/img-3.jpg');
        });
      });
  })
  .catch(err => console.error(err));
