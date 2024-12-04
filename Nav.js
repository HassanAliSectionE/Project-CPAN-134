const apiKey =  "90bf53ffb83ae6c976c1c29639cb86a2";

// Get the user's location
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getWeather, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// Fetch weather data
function getWeather(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            document.getElementById("precipitation").innerText = data.weather[0].description || "N/A";
            document.getElementById("feels-like").innerText = `${data.main.feels_like}°C`;
            document.getElementById("temperature").innerText = `${data.main.temp}°C`;
            const sunsetTime = new Date(data.sys.sunset * 1000);
            document.getElementById("sunset").innerText = sunsetTime.toLocaleTimeString();
            document.getElementById("humidity").innerText = `${data.main.humidity}%`;
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            alert("Failed to fetch weather data.");
        });
}

// Handle errors
function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}

// Initialize
getLocation();