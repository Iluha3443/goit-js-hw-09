import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const btnStart = document.querySelector('button[data-start]');
btnStart.disabled = true;
const daysEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = new Date();
    if (currentDate > selectedDates[0]) {
      window.alert("Please choose a date in the future");
    } else {
      btnStart.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

btnStart.addEventListener('click', onStartTime);

let interval;

function onStartTime() {
  interval = setInterval(updateTimer, 1000);
  btnStart.disabled = true;
}

function updateTimer() {
  const selectedDate = flatpickr.parseDate(options.defaultDate);
  const currentTime = new Date().getTime();
  const timeDifference = selectedDate - currentTime;

  const { days, hours, minutes, seconds } = convertMs(timeDifference);

  const formattedDays = addLeadingZero(days);
  const formattedHours = addLeadingZero(hours);
  const formattedMinutes = addLeadingZero(minutes);
  const formattedSeconds = addLeadingZero(seconds);

  daysEl.textContent = formattedDays;
  hoursEl.textContent = formattedHours;
  minutesEl.textContent = formattedMinutes;
  secondsEl.textContent = formattedSeconds;

  if (timeDifference <= 0) {
    clearInterval(interval);
    btnStart.disabled = false;
  }
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
