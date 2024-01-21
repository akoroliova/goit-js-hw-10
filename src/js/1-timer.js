import flatpickr from 'flatpickr'; //https://github.com/flatpickr/flatpickr/blob/master/src/types/options.ts#L19
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const options = {
  enableTime: true,
  //чомусь не відображаються хвилини:секунди
  dateFormat: 'Y-m-d H:i',
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  // Метод onClose() з об'єкта параметрів викликається щоразу під час закриття елемента інтерфейсу, який створює flatpickr. Саме в ньому варто обробляти дату, обрану користувачем. Параметр selectedDates — це масив обраних дат, тому ми беремо перший елемент selectedDates[0].
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    console.log(Date(Date.now));
    // Напиши скрипт таймера, який здійснює зворотний відлік до певної дати.
    //При обранні дати з минулого, кнопка Start стає неактивною і з’являється повідомлення з текстом "Please choose a date in the future".
    if (selectedDates[0] < Date.now || selectedDates[0] === null) {
      window.alert('Please choose a date in the future');
      //і зроби кнопку «Start» не активною.
      //Якщо користувач вибрав валідну дату (в майбутньому), кнопка «Start» стає активною.
      //При першому завантаженні сторінки кнопка Start не активна.
      //Кнопка «Start» повинна бути неактивною доти, доки користувач не вибрав дату в майбутньому. Зверни увагу, що при обранні валідної дати, не запуску таймера і обранні потім невалідної дати, кнопка після розблокування має знову стати неактивною.
      //Натисканням на кнопку «Start» починається зворотний відлік часу до обраної дати з моменту натискання.
      //При натисканні на кнопку Start вона стає неактивною, на сторінку виводиться час, що лишився до обраної дати у форматі xx:xx:xx:xx, і запускається зворотний відлік часу до обраної дати.
      //Натисканням на кнопку «Start» скрипт повинен обчислювати раз на секунду, скільки часу залишилось до вказаної дати, і оновлювати інтерфейс таймера, показуючи чотири цифри: дні, години, хвилини і секунди у форматі xx:xx:xx:xx.
      //Кількість днів може складатися з більше, ніж двох цифр.
      //Кожну секунду оновлюється інтерфейс і показує оновлені дані часу, який залишився.
      //Таймер зупиняється, коли доходить до кінцевої дати, тобто залишок часу дорівнює нулю і інтерфейс виглядає так 00:00:00:00.
      //Час в інтерфейсі відформатований, і якщо він містить менше двох символів, на початку числа доданий 0.
      //Якщо таймер запущений, для того щоб вибрати нову дату і перезапустити його — необхідно перезавантажити сторінку.
    }
  },
};

const fp = flatpickr('#datetime-picker', { options });

// оголоси поза межами методу let змінну, наприклад, userSelectedDate, і після валідації її в методі onClose() на минуле/майбутнє запиши обрану дату в цю let змінну.
let userSelectedDate;

//Для підрахунку значень використовуй готову функцію convertMs, де ms — різниця між кінцевою і поточною датою в мілісекундах. Функція convertMs() повертає об'єкт з розрахованим часом, що залишився до кінцевої дати.  Зверни увагу, що вона не форматує результат. Тобто якщо залишилося 4 хвилини або будь-якої іншої складової часу, то функція поверне 4, а не 04. В інтерфейсі таймера необхідно додавати 0, якщо в числі менше двох символів.:
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
//Напиши функцію, наприклад addLeadingZero(value), яка використовує метод рядка padStart(targetLength, padString) і перед відмальовуванням інтерфейсу форматує значення (повертає теж String).
function addLeadingZero(value) {
  convertMs.toString.padStart(convertMs.toString.length + 1, '0');
}

//Для відображення повідомлень користувачеві, замість window.alert(), використовуй бібліотеку iziToast. https://izitoast.marcelodolza.com/#Options
// iziToast.error({
//   title: 'Error',
//   message: 'Illegal operation',
// });
