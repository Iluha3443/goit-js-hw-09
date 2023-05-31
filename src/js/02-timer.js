import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const btnStart = document.querySelector('button[data-start]');
btnStart.disabled = true;
const timerEl = document.querySelector('.timer');
const daysEl = document.querySelector('span[data-days]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = new Date();
    if (selectedDates[0] < currentDate) {
      window.alert("Please choose a date in the future");
      btnStart.disabled = true;
    } else {
      btnStart.disabled = false;
    }
  },
};

flatpickr("#datetime-picker", options);

let interval;

btnStart.addEventListener('click', onStart);

function onStart() {
  const selectedDate = flatpickr.parseDate(options.defaultDate);
  const currentTime = new Date().getTime();
  const targetTime = selectedDate.getTime();
  const timeDifference = targetTime - currentTime;

  if (timeDifference > 0) {
    btnStart.disabled = true;
    interval = setInterval(updateTimer, 1000);
    updateTimer();
  }
}


function updateTimer() {
  const selectedDate = flatpickr.parseDate(options.defaultDate);
  const currentTime = new Date().getTime();
  const timeDifference = selectedDate.getTime() - currentTime;

  if (timeDifference <= 0) {
    clearInterval(interval);
    btnStart.disabled = false;
    timerEl.textContent = '00:00:00:00';
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(timeDifference);

  const formattedDays = addLeadingZero(days);
  const formattedHours = addLeadingZero(hours);
  const formattedMinutes = addLeadingZero(minutes);
  const formattedSeconds = addLeadingZero(seconds);

  const formattedTime = `${formattedDays}:${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  timerEl.textContent = formattedTime; 
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

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
