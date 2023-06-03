import Notiflix from 'notiflix';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/themes/dark.css";
Notiflix.Notify.init({
    position: 'center-center',
    showOnlyTheLastOne: true,
})
    const input = document.querySelector('input#datetime-picker');
    const btnStart = document.querySelector('[data-start]');
    const daysCounter = document.querySelector('[data-days]');
    const hoursCounter = document.querySelector('[data-hours]');
    const minutesCounter = document.querySelector('[data-minutes]');
    const secondsCounter = document.querySelector('[data-seconds]');
    const counterBox = document.querySelector('.timer');
counterBox.style.display = 'flex'
counterBox.style.gap = '10px'
btnStart.setAttribute('disabled', 'disabled');
input.addEventListener('input', flatpickr)
let timer = new Date();
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        timer = selectedDates[0] - new Date();
        startBtn(timer)
    },
};
flatpickr("#datetime-picker", options);
function convertMs(convertedTime) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const days = Math.floor(convertedTime / day);
    const hours = Math.floor((convertedTime % day) / hour);
    const minutes = Math.floor(((convertedTime % day) % hour) / minute);
    const seconds = Math.floor((((convertedTime % day) % hour) % minute) / second);
    addLeadingZero({ days, hours, minutes, seconds })
    if (days === 0 && hours === 0 && minutes === 0) {
        warningTimer({ seconds })
    }
}
function startBtn(timer) {
    if (timer < 0) {
        Notiflix.Notify.info("Please choose a date in the future");
        return
    } else {
        btnStart.removeAttribute('disabled', 'disabled');
        btnStart.addEventListener('click', start)
    }
}
function start() {
        btnStart.setAttribute('disabled', 'disabled');
        input.setAttribute('disabled', 'disabled');
        let intervalId = setInterval(() => {
            timer -= 1000;
            if (timer <= 0) {
            btnStart.removeAttribute('disabled', 'disabled');
            input.removeAttribute('disabled', 'disabled');
                clearInterval(intervalId)
                return
            } else {
                convertMs(timer)
            }
        }, 1000);
    }
    function warningTimer({ seconds }) {
        if (seconds >= 5) {
            return;
        } else if(seconds >=1){
            Notiflix.Notify.warning(`Залишилось : ${seconds}`);
        } else {
            Notiflix.Notify.success(`ЧАС ЗАКІНЧИВСЯ, ОБЕРІТЬ НОВУ ДАТУ`);
        }
    }
    function addLeadingZero({ days, hours, minutes, seconds }) {
        secondsCounter.textContent = String(seconds).padStart(2, '0');
        minutesCounter.textContent = String(minutes).padStart(2, '0');
        hoursCounter.textContent = String(hours).padStart(2, '0');
    daysCounter.textContent = String(days).padStart(2, '0');
};