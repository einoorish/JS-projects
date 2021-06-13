const API_KEY = "169f9016f4484aef7e70d9b232381960";
const URL = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

async function getWeather(cityName){
  let response = await fetch(URL(cityName), { mode: "cors" });
  let data = await response.json();
  updateWeatherData(data);
}

function updateWeatherData(data) {
    let temp = convertKtoC(data.main.temp);
    let weather = document.createElement("div");
    weather.classList.add("weather");

    weather.innerHTML = `
        <h2>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
        ${temp}°C
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /></h2>
        <small>${data.weather[0].main}</small>
    `;

    // cleanup
    main.innerHTML = "";

    main.appendChild(weather);
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const city = search.value;

    if (city) {
        getWeather(city);
    }
});

function convertKtoC(K) {
    return Math.floor(K - 273.15);
}
