document.addEventListener('DOMContentLoaded', () => {
    const citySearchForm = document.getElementById('city-search-form');
    const cityInput = document.getElementById('city-input');
    const currentWeatherDiv = document.getElementById('current-weather');
    const forecastDiv = document.getElementById('forecast-display'); // For future use

    const API_KEY = 'caa06bb7930f0d3e7024f95e514d7943'; // Actual API key

    citySearchForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission
        const cityName = cityInput.value.trim();

        if (!cityName) {
            currentWeatherDiv.innerHTML = '<p>Please enter a city name.</p>';
            return;
        }

        currentWeatherDiv.innerHTML = '<p>Loading current weather...</p>';
        forecastDiv.innerHTML = '<p>Loading forecast...</p>'; // Reset forecast display too

        // Construct the API URL (will verify this with docs)
        // Example: https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;

        try {
            const response = await fetch(apiUrl);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`City not found or API error: ${response.status} ${errorData.message || ''}`);
            }

            const data = await response.json();

            // Extract and display weather information
            const temperature = data.main.temp;
            const description = data.weather[0].description;
            const iconCode = data.weather[0].icon;
            const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
            const cityNameDisplay = data.name;
            const countryDisplay = data.sys.country;

            currentWeatherDiv.innerHTML = `
                <h3>${cityNameDisplay}, ${countryDisplay}</h3>
                <img src="${iconUrl}" alt="${description}">
                <p>Temperature: ${temperature}°C</p>
                <p>Weather: ${description}</p>
            `;

        } catch (error) {
            console.error('Failed to fetch weather data:', error);
            currentWeatherDiv.innerHTML = `<p>Failed to fetch weather data. ${error.message}. Please check the city name and your API key.</p>`;
        }
    });
});
