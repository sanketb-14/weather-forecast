//   Add this at the beginning of your script.js file



function getCurrentLocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
  

  async function handleCitySearch() {
    const searchInput = document.getElementById('searchInput');
    const location = searchInput.value.trim();
  
    if (location === "") {
      displayErrorMessage('Please enter a city name.');
      return;
    }
  
    try {
      const currentWeatherData = await getWeatherDataByCity(location);
      const forecastData = await getForecastData(currentWeatherData.coord.lat, currentWeatherData.coord.lon);
      updateUI(currentWeatherData, forecastData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      displayErrorMessage('Error fetching weather data. Please try again later.');
    }
  }
  
  // Handle current location weather
  async function handleCurrentLocationWeather() {
    try {
      const { lat, lon } = await getCurrentLocation();
      const currentWeatherData = await getCurrentWeatherData(lat, lon);
      const forecastData = await getForecastData(lat, lon);
      updateUI(currentWeatherData, forecastData);
    } catch (error) {
      console.error('Error fetching current location weather data:', error);
      displayErrorMessage('Error fetching current location weather data. Please try searching for a city instead.');
    }
  }
  
  // Set up event listeners
  document.getElementById('searchButton').addEventListener('click', handleCitySearch);
  document.getElementById('currentLocationButton').addEventListener('click', handleCurrentLocationWeather);
  document.getElementById('searchInput').addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      handleCitySearch();
    }
  });
  
  // Initial load: Get current location weather
  window.addEventListener('load', handleCurrentLocationWeather);
  // Fetch current weather data for a given location
  async function getCurrentWeatherData(lat, lon) {
    const apiKey = 'baffab6f3acfdd07138f9df63234eed6';
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();
    console.log("Current weather data:", data);
    return data;
  }
  
  // Fetch 5-day forecast data for a given location
  async function getForecastData(lat, lon) {
    const apiKey = 'baffab6f3acfdd07138f9df63234eed6';
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();
    console.log("Forecast data:", data);
    return data;
  }
  
  // Fetch weather data for a given city name
  async function getWeatherDataByCity(cityName) {
    const apiKey = 'baffab6f3acfdd07138f9df63234eed6';
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();
    console.log("Weather data by city:", data);
    return data;
  }
  
  // Handle user input and update the UI
  async function handleLocationSearch() {
    const searchInput = document.getElementById('searchInput');
    const location = searchInput.value.trim();
  
    try {
      let currentWeatherData;
      let forecastData;
      
      if (location === "") {
        // If no location is entered, fetch weather data for the user's current location
        const { lat, lon } = await getCurrentLocation();
        currentWeatherData = await getCurrentWeatherData(lat, lon);
        forecastData = await getForecastData(lat, lon);
      } else {
        // If a location is entered, fetch weather data for that city
        currentWeatherData = await getWeatherDataByCity(location);
        forecastData = await getForecastData(currentWeatherData.coord.lat, currentWeatherData.coord.lon);
      }
      
      updateUI(currentWeatherData, forecastData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      displayErrorMessage('Error fetching weather data. Please try again later.');
    }
  }
  
  // Update the UI with the weather data
  function updateUI(currentWeatherData, forecastData) {
    // Update the current weather information
    document.getElementById('city').textContent = `${currentWeatherData.name}`;


    document.getElementById('currentTemperature').textContent = `${currentWeatherData.main.temp}°C`;
    document.getElementById('currentCondition').textContent = currentWeatherData.weather[0].description;
    document.getElementById('currentHumidity').textContent = `Humidity: ${currentWeatherData.main.humidity}%`;
    document.getElementById('currentWindSpeed').textContent = `Wind: ${currentWeatherData.wind.speed} m/s`;
    
    // Update weather icon
    const iconCode = currentWeatherData.weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
    document.getElementById('currentWeatherIcon').src = iconUrl;
  
    // Update 5-day forecast
    updateForecast(forecastData);
  
    // Add to recently searched cities
    addToRecentSearches(currentWeatherData.name);
  }
  
  // Update the 5-day forecast
  function updateForecast(forecastData) {
    const forecastContainer = document.getElementById('forecastContainer');
    forecastContainer.innerHTML = ''; // Clear previous forecast
  
    // Group forecast data by day
    const dailyForecasts = groupForecastsByDay(forecastData.list);
  
    // Display forecast for next 5 days
    Object.entries(dailyForecasts).slice(0, 5).forEach(([date, forecasts]) => {
      const dayForecast = forecasts[0]; // Use the first forecast of the day
      const forecastElement = createForecastElement(date, dayForecast);
      forecastContainer.appendChild(forecastElement);
    });
  }
  
  // Group forecast data by day
  function groupForecastsByDay(forecasts) {
    return forecasts.reduce((acc, forecast) => {
      const date = forecast.dt_txt.split(' ')[0];
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(forecast);
      return acc;
    }, {});
  }
  
  // Create a forecast element for a single day
  function createForecastElement(date, forecast) {
    const forecastElement = document.createElement('div');
    forecastElement.classList.add('bg-white', 'shadow-md', 'p-4', 'rounded-xl' , 'flex' , 'sm:flex-col',   'justify-between' , 'items-center');
    
    const dateObj = new Date(date);
    const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
    
    forecastElement.innerHTML = `
      <h3 class="font-bold">${dayName}</h3>
      <img src="http://openweathermap.org/img/w/${forecast.weather[0].icon}.png" alt="${forecast.weather[0].description}">
      <p>${forecast.main.temp.toFixed(1)}°C</p>
      <p>${forecast.weather[0].description}</p>
    `;
    
    return forecastElement;
  }
  
  // Display an error message to the user
  function displayErrorMessage(message) {
    const errorElement = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');
    errorText.textContent = message;
    errorElement.classList.remove('hidden');
  }
  
  // Add city to recently searched list
  function addToRecentSearches(cityName) {
    const recentList = document.getElementById('recentCitiesList');
    const listItem = document.createElement('li');
    listItem.textContent = cityName;
    listItem.classList.add('cursor-pointer', 'hover:text-blue-500');
    listItem.addEventListener('click', () => {
      document.getElementById('searchInput').value = cityName;
      handleLocationSearch();
    });
    recentList.prepend(listItem);
  
    // Limit the list to 5 items
    while (recentList.children.length > 5) {
      recentList.removeChild(recentList.lastChild);
    }
  }
  
  // Set up event listeners
  document.getElementById('searchButton').addEventListener('click', handleLocationSearch);
  document.getElementById('searchInput').addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      handleLocationSearch();
    }
  });
  
  // Initial load: Get current location weather
  window.addEventListener('load', async () => {
    try {
      const { lat, lon } = await getCurrentLocation();
      const currentWeatherData = await getCurrentWeatherData(lat, lon);
      const forecastData = await getForecastData(lat, lon);
      updateUI(currentWeatherData, forecastData);
    } catch (error) {
      console.error('Error fetching initial weather data:', error);
      displayErrorMessage('Error fetching weather data. Please try searching for a city.');
    }
  });


