import { Notify } from 'notiflix/build/notiflix-notify-aio';
Notify.init({ useIcon: false });

const form = document.querySelector('.form');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();

  let delay = Number(form.delay.value);
  const step = Number(form.step.value);
  const amount = Number(form.amount.value);

  for (let position = 1; position <= amount; position++) {
    createPromise(position, delay).then(onPromiseSuccess).catch(onPromiseError);
    delay += step;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      }
      reject({ position, delay });
    }, delay);
  });
}

function onPromiseSuccess({ position, delay }) {
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

function onPromiseError({ position, delay }) {
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}
