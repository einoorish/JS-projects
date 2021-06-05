let currentYear = new Date().getFullYear()
let birthday = new Date(currentYear, 3, 16);
if(birthday < new Date()) birthday = new Date(currentYear + 1, 3, 16);

let daysEl = document.getElementById("days");
let hoursEl = document.getElementById("hours");
let minutesEl = document.getElementById("minutes");
let secondsEl = document.getElementById("seconds");

function countdown(){
  let currentDate = new Date();

  let difference = (birthday - currentDate) / 1000;

  const days = Math.floor(difference / 3600 / 24);
  const hours = Math.floor(difference / 3600) % 24;
  const minutes = Math.floor(difference / 60) % 60;
  const seconds = Math.floor(difference) % 60;

  daysEl.innerHTML = days;
  hoursEl.innerHTML = hours;
  minutesEl.innerHTML = minutes;
  secondsEl.innerHTML = seconds;
}

countdown();

setInterval(countdown, 1000);
