function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function () {
    var context = this;
    var args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      func.apply(context, args);
    }
  };
}


const images = document.querySelectorAll(`.slide-in`);

function checkSlide(e) {
  images.forEach( image => {
    //Halfway point through the image
    const slideInAt = (window.scrollY + window.innerHeight) - (image.height / 2);
    //Bottom of the image
    const bottomOfImage = image.offsetTop + image.height;
    //Is the image at its halfway point?
    const isHalfShown = slideInAt > image.offsetTop;
    //We didn't scroll by the image yet, did we?
    const isNotScrolledBy = window.scrollY < bottomOfImage;
    if (isHalfShown && isNotScrolledBy) {
      image.classList.add('active');
    }
    else {
      image.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', debounce(checkSlide));