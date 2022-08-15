function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const CHANGE_COLOR_DELAY = 1000;
let timeoutID = null;
let isActive = false;

const refs = {
  buttonStart: document.querySelector('button[data-start]'),
  buttonStop: document.querySelector('button[data-stop]'),
};

refs.buttonStart.addEventListener('click', onButtonStart);
refs.buttonStop.addEventListener('click', onButtonStop);

function changeBodyBcgColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}

function onButtonStart() {
  if (isActive) {
    return;
  }

  isActive = true;
  refs.buttonStart.setAttribute('disabled', false);

  timeoutID = setInterval(() => {
    changeBodyBcgColor();
  }, CHANGE_COLOR_DELAY);
}

function onButtonStop() {
  isActive = false;
  clearInterval(timeoutID);
  refs.buttonStart.removeAttribute('disabled');
}
