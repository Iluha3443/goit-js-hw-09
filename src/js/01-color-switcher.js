const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const body = document.body;

let intervalId;
let backgroundColor;

btnStart.addEventListener('click', function() {
    intervalId = setInterval(function () {
       btnStart.disabled = true;
       document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
     
});

btnStop.addEventListener('click', onColorStop);

function onColorStop() {
    clearInterval(intervalId);
    document.body.style.backgroundColor = backgroundColor;
    btnStart.disabled = false;
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
};