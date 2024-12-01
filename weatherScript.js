<<<<<<< HEAD
const apiKey = "1d283bd6be31979ed875e28986c118de"; 
const city = "London,GB"; 
const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
=======
const apiKey = "1d283bd6be31979ed875e28986c118de";
const city = "London,GB";
const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

>>>>>>> 6998e3c642583850c7d33e242dd51450cd135701
const modeToggle = document.getElementById("modeToggle");
const unitToggle = document.getElementById("unitToggle");
const weatherInfo = document.getElementById("weatherInfo");
const temperatureDisplay = document.getElementById("temperature");

let isCelsius = true;
let tempC = 0;
let tempF = 0;

<<<<<<< HEAD
=======
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

>>>>>>> 6998e3c642583850c7d33e242dd51450cd135701
async function fetchWeather() {
try {
const response = await fetch(weatherApiUrl);
if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
<<<<<<< HEAD
const data = await response.json();

const weatherMain = data.weather[0].main.toLowerCase(); 
console.log("Weather condition:", weatherMain); 
=======

const data = await response.json();

const weatherMain = data.weather[0].main.toLowerCase();
>>>>>>> 6998e3c642583850c7d33e242dd51450cd135701

tempC = data.main.temp;
tempF = (tempC * 9) / 5 + 32;

weatherInfo.textContent = `Weather: ${capitalizeFirstLetter(weatherMain)}`;
updateTemperature();
updateBackground(weatherMain);
} catch (error) {
console.error("Error fetching weather data:", error);
<<<<<<< HEAD
weatherInfo.textContent = "Error fetching weather data";
=======
weatherInfo.textContent = `Error fetching weather data: ${error.message}`;
>>>>>>> 6998e3c642583850c7d33e242dd51450cd135701
}
}

function updateTemperature() {
temperatureDisplay.textContent = `Temperature: ${isCelsius ? tempC.toFixed(1) + "°C" : tempF.toFixed(1) + "°F"}`;
}

function updateBackground(weatherMain) {
<<<<<<< HEAD
const body = document.body;

switch (weatherMain) {
case "clear":
body.style.backgroundImage = "url('./images/clear.jpg')";
break;
case "clouds":
body.style.backgroundImage = "url('./images/clouds.jpg')";
break;
case "rain":
body.style.backgroundImage = "url('./images/rain.jpg')";
break;
case "snow":
body.style.backgroundImage = "url('./images/snow.jpg')";
break;
case "thunderstorm":
body.style.backgroundImage = "url('./images/thunderstorm.jpg')";
break;
case "mist":
case "fog":
body.style.backgroundImage = "url('./images/mist.jpg')";
break;
default:
body.style.backgroundImage = "url('./images/default.jpg')";
}

body.style.backgroundSize = "cover";
body.style.backgroundRepeat = "no-repeat";
=======
const backgroundImage = hostedImages[weatherMain] || hostedImages.default;
document.body.style.backgroundImage = `url('${backgroundImage}')`;
>>>>>>> 6998e3c642583850c7d33e242dd51450cd135701
}

function capitalizeFirstLetter(string) {
return string.charAt(0).toUpperCase() + string.slice(1);
}

function toggleUnit() {
isCelsius = !isCelsius;
<<<<<<< HEAD
unitToggle.textContent = isCelsius ? "Switch to °F" : "Switch to °C";
=======
>>>>>>> 6998e3c642583850c7d33e242dd51450cd135701
updateTemperature();
}

function toggleMode() {
document.body.classList.toggle("dark-mode");
<<<<<<< HEAD
modeToggle.textContent = document.body.classList.contains("dark-mode") ? "Switch to Light Mode" : "Switch to Dark Mode";
=======
>>>>>>> 6998e3c642583850c7d33e242dd51450cd135701
}

modeToggle.addEventListener("click", toggleMode);
unitToggle.addEventListener("click", toggleUnit);

fetchWeather();
setInterval(fetchWeather, 600000);
<<<<<<< HEAD
async function fetchWeather() {
    try {
      const response = await fetch(weatherApiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
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
=======
>>>>>>> 6998e3c642583850c7d33e242dd51450cd135701