import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Отримуємо форму та її елементи:
const form = document.querySelector('form.form');
const delayInput = form.querySelector('input[name="delay"]');
const stateRadio = form.querySelectorAll('input[name="state"]');

//Клік на кнопку "сабміт" створює проміс:
const handleSubmit = event => {
  event.preventDefault();

  // Отримуємо значення з поля вводу та вибраної радіокнопки, обрані юзером:
  const delay = parseInt(delayInput.value);
  const selectedState = Array.from(stateRadio).find(radio => radio.checked); //шукає перший елемент у колекції stateRadio, для якого властивість checked є істинною.

  // Створення промісу
  const notificationPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (selectedState.value === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  // Обробка результату промісу і вивод тостів:
  notificationPromise
    .then(result => {
      iziToast.success({
        position: 'topRight',
        title: 'OK',
        message: `✅ Fulfilled promise in ${result}ms`,
      });
    })
    .catch(error => {
      iziToast.error({
        position: 'topRight',
        title: 'Error',
        message: `❌ Rejected promise in ${error}ms`,
      });
    });
};
form.addEventListener('submit', handleSubmit);
