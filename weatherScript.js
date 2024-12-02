const apiKey = "1d283bd6be31979ed875e28986c118de";
const city = "London,GB";
const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

const modeToggle = document.getElementById("modeToggle");
const unitToggle = document.getElementById("unitToggle");
const weatherInfo = document.getElementById("weatherInfo");
const temperatureDisplay = document.getElementById("temperature");

let isCelsius = true;
let tempC = 0;
let tempF = 0;

const hostedImages = {
fog: "",
clear: "https://imgur.com/a/sx7JCUn",
clouds: "https://imgur.com/a/k3iQBAi",
rain: "https://imgur.com/a/FImlJVX",
snow: "https://imgur.com/a/xYq0DfN",
thunderstorm: "https://imgur.com/a/v9VKd3j",
mist: "https://imgur.com/a/e7YAmFl",
default: "https://imgur.com/a/LAXMx5h"
};

async function fetchWeather() {
try {
const response = await fetch(weatherApiUrl);
if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

const data = await response.json();

const weatherMain = data.weather[0].main.toLowerCase();

tempC = data.main.temp;
tempF = (tempC * 9) / 5 + 32;

weatherInfo.textContent = `Weather: ${capitalizeFirstLetter(weatherMain)}`;
updateTemperature();
updateBackground(weatherMain);
} catch (error) {
console.error("Error fetching weather data:", error);
weatherInfo.textContent = `Error fetching weather data: ${error.message}`;
}
}

function updateTemperature() {
temperatureDisplay.textContent = `Temperature: ${isCelsius ? tempC.toFixed(1) + "°C" : tempF.toFixed(1) + "°F"}`;
}

function updateBackground(weatherMain) {
const backgroundImage = hostedImages[weatherMain] || hostedImages.default;
document.body.style.backgroundImage = `url('${backgroundImage}')`;
}

function capitalizeFirstLetter(string) {
return string.charAt(0).toUpperCase() + string.slice(1);
}

function toggleUnit() {
isCelsius = !isCelsius;
updateTemperature();
}

function toggleMode() {
document.body.classList.toggle("dark-mode");
}

modeToggle.addEventListener("click", toggleMode);
unitToggle.addEventListener("click", toggleUnit);

fetchWeather();
setInterval(fetchWeather, 600000);
