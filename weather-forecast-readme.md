# Weather Forecast Web Application

This web application provides users with current weather information and a 5-day forecast for any city or their current location. It features a clean, responsive design and uses the OpenWeatherMap API to fetch weather data.

## Features

- Search for weather information by city name
- Get weather information for the user's current location
- Display current weather conditions including temperature, humidity, and wind speed
- Show a 5-day forecast with daily weather summaries
- Responsive design that works on both desktop and mobile devices
- Recently searched cities list for quick access

## Technologies Used

- HTML5
- CSS3 (with Tailwind CSS for styling)
- JavaScript (ES6+)
- OpenWeatherMap API

## Setup and Installation

1. Clone the repository to your local machine:
   ```
   git clone https://github.sanketb_14/weather-forecast.git
   ```

2. Navigate to the project directory:
   ```
   cd weather-forecast
   ```

3. Open the `index.html` file in your web browser to run the application locally.

4. (Optional) If you want to modify the Tailwind CSS styles, you'll need to set up a build process. Refer to the Tailwind CSS documentation for more information.

## Configuration

To use this application, you need to obtain an API key from OpenWeatherMap:

1. Sign up for a free account at [OpenWeatherMap](https://openweathermap.org/).
2. Generate an API key in your account dashboard.
3. Replace the placeholder API key in the `script.js` file with your actual API key:

   ```javascript
   const apiKey = 'YOUR_API_KEY_HERE';
   ```

## Usage

1. Enter a city name in the search input and click the "Search City" button or press Enter.
2. Click the "Use Current Location" button to get weather information for your current location.
3. View the current weather conditions and 5-day forecast.
4. Click on recently searched cities to quickly view their weather information again.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgements

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Icons from [Lucide](https://lucide.dev/)
- Fonts from [Google Fonts](https://fonts.google.com/)

