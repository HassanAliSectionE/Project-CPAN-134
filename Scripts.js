
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
  
