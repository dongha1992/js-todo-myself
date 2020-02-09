const body = document.querySelector("body");
const IMG_NUMBER = 5;

function patintingBg(imgNum) {
  const image = new Image();
  image.src = `img/${imgNum + 1}.jpg`;
  image.classList.add("bg");
  body.appendChild(image);
}
function randomNum() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

function init() {
  patintingBg(randomNum());
}
init();
