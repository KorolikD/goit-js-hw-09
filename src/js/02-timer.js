import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// --------------------------------------
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
function updateClockFace({ days, hours, minutes, seconds }) {
  refs.clockfaceDays.textContent = days;
  refs.clockfaceHours.textContent = hours;
  refs.clockfaceMinutes.textContent = minutes;
  refs.clockfaceSeconds.textContent = seconds;
}

// --------------------------------------
const refs = {
  datetimePicker: document.querySelector('#datetime-picker'),
  startButton: document.querySelector('button[data-start]'),

  clockfaceDays: document.querySelector('.value[data-days]'),
  clockfaceHours: document.querySelector('.value[data-hours]'),
  clockfaceMinutes: document.querySelector('.value[data-minutes]'),
  clockfaceSeconds: document.querySelector('.value[data-seconds]'),
};
let selectedDate = 0;
let isActive = false;
let intervalId = null;

// --------------------------------------
refs.startButton.setAttribute('disabled', false);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const dateNow = Date.now();
    const selectedDatesMs = Date.parse(selectedDates);

    if (dateNow > selectedDatesMs) {
      refs.startButton.setAttribute('disabled', false);
      Notify.failure('Please choose a date in the future');
      return;
    }
    refs.startButton.removeAttribute('disabled');
    console.log(selectedDates[0]);
  },
};
flatpickr('#datetime-picker', options);

// --------------------------------------
refs.datetimePicker.addEventListener('input', onDatetimePickerInput);
refs.startButton.addEventListener('click', onStartButtonClick);

function onDatetimePickerInput() {
  selectedDate = Date.parse(refs.datetimePicker.value);
}

function onStartButtonClick() {
  if (isActive) {
    return;
  }

  isActive = true;

  intervalId = setInterval(() => {
    const currentTime = Date.now();
    let deltaTime = selectedDate - currentTime;

    const { days, hours, minutes, seconds } = convertMs(deltaTime);

    if (deltaTime >= 0) {
      updateClockFace({ days, hours, minutes, seconds });
    } else {
      clearInterval(intervalId);
      isActive = false;
    }
  }, 1000);
}
