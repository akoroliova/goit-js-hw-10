import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const button = document.querySelector('button');
button.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now() || selectedDates[0] === null) {
      button.disabled = true;
      iziToast.error({
        position: 'topRight',
        title: 'Error',
        message: 'Please choose a date in the future',
      });
    } else {
      button.disabled = false;
      userSelectedDate = selectedDates[0];
    }
  },
};
const flatpickrInstance = flatpickr('#datetime-picker', options);

let userSelectedDate;

const handleSubmit = event => {
  event.preventDefault();

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

  const daysElement = document.querySelector('span[data-days]');
  const hoursElement = document.querySelector('span[data-hours]');
  const minutesElement = document.querySelector('span[data-minutes]');
  const secondsElement = document.querySelector('span[data-seconds]');

  const intervalId = setInterval(() => {
    const differenceInMs = userSelectedDate - Date.now();
    const result = convertMs(differenceInMs);
    button.disabled = true;

    function addLeadingZero(value) {
      return value.length < 2 ? value.padStart(2, '0') : value;
    }

    daysElement.textContent = addLeadingZero(result.days.toString());
    hoursElement.textContent = addLeadingZero(result.hours.toString());
    minutesElement.textContent = addLeadingZero(result.minutes.toString());
    secondsElement.textContent = addLeadingZero(result.seconds.toString());

    if (
      result.days <= 0 &&
      result.hours <= 0 &&
      result.minutes <= 0 &&
      result.seconds <= 0
    ) {
      clearInterval(intervalId);
      console.log('Interval cleared!');
    }
  }, 1000);
};
button.addEventListener('click', handleSubmit);
