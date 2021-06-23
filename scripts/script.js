let letter = document.querySelectorAll(".letter");

let animation = anime({
  targets:letter,
  translateY:[-50,0],
  delay: (el, i) => 300 + 70 * i,
  easing:'easeInOutExpo',
});

