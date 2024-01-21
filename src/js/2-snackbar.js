import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const promiseCreationForm = document.querySelector('form.form');

// Напиши скрипт, який після сабміту форми створює проміс. В середині колбека цього промісу через вказану користувачем кількість мілісекунд проміс має виконуватися (при fulfilled) або відхилятися (при rejected), залежно від обраної опції в радіокнопках. Значенням промісу, яке передається як аргумент у методи resolve/reject, має бути значення затримки в мілісекундах.

// Створений проміс треба опрацювати у відповідних для вдалого/невдалого виконання методах.

//Повідомлення, що виводиться, містить тип обраного стейту і кількість мілісекунд згідно з шаблоном в умові.

// Якщо проміс виконується вдало, виводь у консоль наступний рядок, де delay — це значення затримки виклику промісу в мілісекундах.

// `✅ Fulfilled promise in ${delay}ms`;

// Якщо проміс буде відхилено, то виводь у консоль наступний рядок, де delay — це значення затримки промісу в мілісекундах.

// `❌ Rejected promise in ${delay}ms`;

//При обранні стану в радіокнопках і натисканні на кнопку Create notification з’являється повідомлення, відповідного до обраного стану стилю, із затримкою в кількість мілісекунд, переданих в інпут.

//promiseCreationForm.addEventListener('input', handleInput);
//promiseCreationForm.addEventListener('submit', handleSubmit);
