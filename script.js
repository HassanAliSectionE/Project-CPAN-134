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
