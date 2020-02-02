const clockContainer = document.querySelector(".js-clock");
const clock = clockContainer.querySelector("span");

function getTime() {
  const date = new Date();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const hours = date.getHours();
  clock.innerHTML = `${hours < 10 ? `0${hours}` : hours} : ${
    minutes < 10 ? `0${minutes}` : minutes
  } : ${seconds < 10 ? `0${seconds}` : seconds}`;
  setInterval(getTime, 1000);
}

function init() {
  getTime();
}

init();
