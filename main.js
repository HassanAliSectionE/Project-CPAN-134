const API_KEY = "7bfa118311914a330b249f9ef172e5f7";
const CITIES = ["Toronto", "Ottawa", "Vancouver", "Montreal", "Calgary", "Edmonton", "Winnipeg", "Quebec City", "Halifax", "Victoria"];
let defaultCity = "Toronto";

const weatherContainer = document.getElementById("weather-container");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const setDefaultButton = document.getElementById("set-default-button");
const resetButton = document.getElementById("reset-button");
const errorMessage = document.getElementById("error-message");

async function fetchWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},CA&appid=${API_KEY}&units=metric`);
        if (!response.ok) {
            throw new Error(`Could not fetch weather for ${city} (Status: ${response.status})`);
        }
        const data = await response.json();
        return {
            name: data.name,
            temperature: data.main.temp,
            condition: data.weather[0].description,
            icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        };
    } catch (error) {
        console.error("Error in fetchWeather:", error);
        throw error;
    }
}

function renderWeatherCard(data) {
    const card = document.createElement("div");
    card.className = "weather-card";
    card.dataset.city = data.name; 
    card.innerHTML = `
        <h2>${data.name}</h2>
        <p><strong>Temperature:</strong> ${data.temperature}°C</p>
        <p><strong>Condition:</strong> ${data.condition}</p>
        <img src="${data.icon}" alt="${data.condition}" />
    `;
    return card;
}

async function loadAllCities() {
    try {
        weatherContainer.innerHTML = ""; 
        for (const city of CITIES) {
            try {
                const data = await fetchWeather(city);
                const card = renderWeatherCard(data);
                weatherContainer.appendChild(card);
            } catch (cityError) {
                console.error(`Error loading city ${city}:`, cityError);
            }
        }
    } catch (error) {
        console.error("Error loading all cities:", error);
        errorMessage.textContent = "Failed to load weather data.";
    }
}

async function loadCity(city) {
    try {
        const data = await fetchWeather(city);
        const card = renderWeatherCard(data);
        weatherContainer.innerHTML = ""; 
        weatherContainer.appendChild(card);
    } catch (error) {
        console.error("Error loading city:", error);
        errorMessage.textContent = error.message;
    }
}

async function setDefaultCity(city) {
    const cards = Array.from(weatherContainer.children);
    const matchingCard = cards.find((card) => card.dataset.city.toLowerCase() === city.toLowerCase());

    if (matchingCard) {
        weatherContainer.prepend(matchingCard);
    } else {
        try {
            const data = await fetchWeather(city);
            const newCard = renderWeatherCard(data);
            weatherContainer.prepend(newCard);
        } catch (error) {
            console.error("Error in setDefaultCity:", error);
            errorMessage.textContent = "Failed to set default city.";
        }
    }
}

searchButton.addEventListener("click", async () => {
    const city = searchInput.value.trim();
    if (!city) {
        errorMessage.textContent = "Please enter a city name.";
        return;
    }
    errorMessage.textContent = "";
    await loadCity(city);
});

setDefaultButton.addEventListener("click", async () => {
    const city = searchInput.value.trim();
    if (!city) {
        errorMessage.textContent = "Please enter a city name to set as default.";
        return;
    }
    errorMessage.textContent = "";
    await setDefaultCity(city);
});

resetButton.addEventListener("click", async () => {
    errorMessage.textContent = ""; 
    searchInput.value = ""; 
    await loadAllCities(); 
});


window.addEventListener("DOMContentLoaded", async () => {
    await loadAllCities(); 
});
let ApiKey = "1d283bd6be31979ed875e28986c118de";
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
const apiKey = "90bf53ffb83ae6c976c1c29639cb86a2";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";
const weatherIconUrl = "https://openweathermap.org/img/wn/";

async function fetchWeather(lat, lon) {
  try {
    const response = await fetch(
      `${apiUrl}?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
    );
    if (!response.ok) {
      throw new Error("Unable to fetch weather data.");
    }
    const data = await response.json();
    updateWeatherUI(data);
  } catch (error) {
    alert(error.message);
  }
}

function updateWeatherUI(data) {
  const city = data.name;
  const temperature = Math.round(data.main.temp);
  const description = data.weather[0].description;
  const weatherIcon = `${weatherIconUrl}${data.weather[0].icon}@2x.png`;

  document.getElementById("city").textContent = city;
  document.getElementById("temperature").textContent = `${temperature}°C`;
  document.getElementById("description").textContent = capitalize(description);
  document.getElementById("weather-icon").src = weatherIcon;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeather(latitude, longitude);
      },
      (error) => {
        alert("Unable to retrieve your location.");
      }
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

// Initialize
getLocation();
function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                fetchWeather(latitude, longitude);
            },
            (error) => {
                console.error("Error fetching location:", error);
                document.getElementById('weather').innerHTML = `<p>Unable to get location. Please allow location access.</p>`;
            }
        );
    } else {
        document.getElementById('weather').innerHTML = `<p>Geolocation is not supported by your browser.</p>`;
    }
}

async function fetchWeather(latitude, longitude) {
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_min,temperature_2m_max,weathercode&hourly=temperature_2m,weathercode&timezone=auto`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        displayHourlyForecast(data);
        displayDailyWeather(data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        document.getElementById('weather').innerHTML = `<p>Unable to fetch weather data.</p>`;
    }
}

function getWeatherIconClass(weatherCode) {
    const iconMap = {
        0: 'wi-day-sunny', 1: 'wi-day-cloudy', 2: 'wi-cloudy', 3: 'wi-cloudy',
        45: 'wi-fog', 48: 'wi-fog', 51: 'wi-rain', 61: 'wi-rain',
        71: 'wi-snow', 80: 'wi-showers', 95: 'wi-thunderstorm', 99: 'wi-storm-showers'
    };
    return iconMap[weatherCode] || 'wi-na';
}

function displayHourlyForecast(data) {
    const weatherContainer = document.getElementById("weather");
    const hourlyForecast = document.createElement("div");
    hourlyForecast.className = "hourly-forecast";
    hourlyForecast.innerHTML = "<h2>10-Hour Forecast</h2>";

    const { hourly } = data;
    const { time, temperature_2m, weathercode } = hourly;

    const now = new Date();
    const currentHourIndex = time.findIndex(t => new Date(t).getTime() > now.getTime());

    for (let i = 0; i < 10; i++) {
        const index = currentHourIndex + i;
        const hourTime = new Date(time[index]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const temp = temperature_2m[index];
        const iconClass = getWeatherIconClass(weathercode[index]);

        const hourCard = document.createElement("div");
        hourCard.className = "hour-card";

        hourCard.innerHTML = `
            <div class="hour-time">${hourTime}</div>
            <div class="weather-icon"><i class="wi ${iconClass}"></i></div>
            <div class="temperature">${temp}°C</div>
        `;

        hourlyForecast.appendChild(hourCard);
    }

    weatherContainer.appendChild(hourlyForecast);
}

function displayDailyWeather(data) {
    const weatherContainer = document.getElementById("weather");

    const dayContainer = document.createElement("div");
    dayContainer.className = "day-container";
    dayContainer.innerHTML = "<h2>Weekly Forecast</h2>";

    const { daily } = data;
    const { time, temperature_2m_min, temperature_2m_max, weathercode } = daily;
    const today = new Date().setHours(0, 0, 0, 0);

    time.forEach((date, index) => {
        const forecastDate = new Date(date).setHours(0, 0, 0, 0);
        if (forecastDate >= today) {
            const dayCard = document.createElement("div");
            dayCard.className = "day-card";

            const day = new Date(date).toLocaleDateString(undefined, { weekday: 'short' });
            const minTemp = temperature_2m_min[index];
            const maxTemp = temperature_2m_max[index];
            const iconClass = getWeatherIconClass(weathercode[index]);

            dayCard.innerHTML = `
                <div class="day-name">${day}</div>
                <div class="temperature"><i class="wi ${iconClass}"></i> Min: ${minTemp}°C, Max: ${maxTemp}°C</div>
            `;

            dayContainer.appendChild(dayCard);
        }
    });

    weatherContainer.appendChild(dayContainer);
}

getCurrentLocation()
{
const apiKey = "90bf53ffb83ae6c976c1c29639cb86a2";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";
const weatherIconUrl = "https://openweathermap.org/img/wn/";

async function fetchWeather(lat, lon) {
  try {
    const response = await fetch(
      `${apiUrl}?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
    );
    if (!response.ok) {
      throw new Error("Unable to fetch weather data.");
    }
    const data = await response.json();
    updateWeatherUI(data);
  } catch (error) {
    alert(error.message);
  }
}

function updateWeatherUI(data) {
  const city = data.name;
  const temperature = Math.round(data.main.temp);
  const description = data.weather[0].description;
  const weatherIcon = `${weatherIconUrl}${data.weather[0].icon}@2x.png`;

  document.getElementById("city").textContent = city;
  document.getElementById("temperature").textContent = `${temperature}°C`;
  document.getElementById("description").textContent = capitalize(description);
  document.getElementById("weather-icon").src = weatherIcon;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeather(latitude, longitude);
      },
      (error) => {
        alert("Unable to retrieve your location.");
      }
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

// Initialize
getLocation();
}