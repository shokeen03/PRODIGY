const apiKey = 'ab0eff8d458f564f82ae61e102d0239d';
const cityInput = document.getElementById('cityInput');
const clearInput = document.getElementById('clearInput');
const weatherDetails = document.getElementById('weatherDetails');

cityInput.addEventListener('input', toggleClearIcon);
clearInput.addEventListener('click', clearCityInput);
cityInput.addEventListener('keypress', fetchWeather);

function toggleClearIcon() {
    clearInput.style.display = cityInput.value.length > 0 ? 'block' : 'none';
}

function clearCityInput() {
    cityInput.value = '';
    clearInput.style.display = 'none';
    weatherDetails.style.display = 'none';
}

async function fetchWeather(event) {
    if (event.key === 'Enter') {
        const cityName = cityInput.value.trim();

        if (cityName) {
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                console.log(data); 

                if (response.ok) {
                    showWeatherDetails(data);
                } else {
                    showError(data.message);
                }
            } catch (error) {
                console.error('Fetch error:', error);
                showError('An error occurred. Please try again later.');
            }
        } else {
            showError('Please enter a valid city name');
        }
    }
}

function showWeatherDetails(data) {
    const temperature = data.main.temp ? data.main.temp.toFixed(2) : 'N/A';
    const humidity = data.main.humidity ? data.main.humidity : 'N/A';
    const windSpeed = data.wind.speed ? data.wind.speed.toFixed(2) : 'N/A';
    const description = data.weather[0] && data.weather[0].description ? data.weather[0].description : 'N/A';
    const country = data.sys.country ? data.sys.country : 'N/A';
    const dust = data.main.grnd_level ? data.main.grnd_level : 'N/A'; 
    const visibilityMiles = data.visibility ? (data.visibility / 1609.34).toFixed(2) : 'N/A'; 
    const sunriseTimestamp = data.sys.sunrise ? data.sys.sunrise * 1000 : 'N/A';
    const sunsetTimestamp = data.sys.sunset ? data.sys.sunset * 1000 : 'N/A';
    const sunriseTime = sunriseTimestamp !== 'N/A' ? new Date(sunriseTimestamp).toLocaleTimeString('en-US') : 'N/A';
    const sunsetTime = sunsetTimestamp !== 'N/A' ? new Date(sunsetTimestamp).toLocaleTimeString('en-US') : 'N/A';

    weatherDetails.innerHTML = `
        <div class="weather-detail">
            <strong>Temperature:</strong> ${temperature} °C
            <i class="fas fa-thermometer-half temperature-icon"></i>
        </div>
        <div class="weather-detail">
            <strong>Humidity:</strong> ${humidity}%
            <i class="fas fa-tint humidity-icon"></i>
        </div>
        <div class="weather-detail">
            <strong>Wind Speed:</strong> ${windSpeed} m/s
            <i class="fas fa-wind wind-icon"></i>
        </div>
        <div class="weather-detail">
            <strong>Description:</strong> ${description}
            <i class="fas fa-cloud description-icon"></i>
        </div>
        <div class="weather-detail">
            <strong>Country:</strong> ${country}
            <i class="fas fa-flag country-icon"></i>
        </div>
        <div class="weather-detail">
            <strong>Dust Level:</strong> ${dust}
            <i class="fas fa-wind dust-icon"></i>
        </div>
        <div class="weather-detail">
            <strong>Visibility:</strong> ${visibilityMiles} mi
            <i class="fas fa-eye visibility-icon"></i>
        </div>
        <div class="weather-detail">
            <strong>Sunrise Time:</strong> ${sunriseTime}
            <i class="fas fa-sun sunrise-icon"></i>
        </div>
        <div class="weather-detail">
            <strong>Sunset Time:</strong> ${sunsetTime}
            <i class="fas fa-moon sunset-icon"></i>
        </div>
    `;

    weatherDetails.classList.add('show');
}

function showError(message) {
    weatherDetails.innerHTML = `<span class="error">${message}</span>`;
    weatherDetails.style.display = 'block';
}