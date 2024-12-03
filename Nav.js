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
  const feelsLike = Math.round(data.main.feels_like);
  const humidity = data.main.humidity;
  const windSpeed = Math.round(data.wind.speed * 3.6); // Convert m/s to km/h
  const description = data.weather[0].description;
  const weatherIcon = `${weatherIconUrl}${data.weather[0].icon}@2x.png`;

  const sunrise = formatTime(data.sys.sunrise);
  const sunset = formatTime(data.sys.sunset);

  document.getElementById("city").textContent = city;
  document.getElementById("temperature").textContent = `${temperature}°C`;
  document.getElementById("description").textContent = capitalize(description);
  document.getElementById("feels-like").textContent = `${feelsLike}°C`;
  document.getElementById("humidity").textContent = `${humidity}%`;
  document.getElementById("wind-speed").textContent = `${windSpeed} km/h`;
  document.getElementById("weather-icon").src = weatherIcon;
  document.getElementById("sunrise").textContent = sunrise;
  document.getElementById("sunset").textContent = sunset;
}

function formatTime(unixTime) {
  const date = new Date(unixTime * 1000);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
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
