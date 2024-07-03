const apiKey = '32d93cc82cb6169bf9085c1232d6d03a';

const weatherContainer = document.getElementById("weather");
const city = document.getElementById("city");
const error = document.getElementById("error");

const units = 'metric';
let temperatureSymobol = units == 'metric' ? "°C" : "°F";

async function fetchWeather() {
    try {
        weatherContainer.innerHTML = '';
        error.innerHTML = '';
        city.innerHTML = '';

        const cityInputtedByUser = document.getElementById('cityInput').value;

        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInputtedByUser}&appid=${apiKey}&units=${units}`;


        const response = await fetch(apiUrl);
        const data = await response.json();

        //Display error if user types invalid city or no city
        if (data.cod == '400' || data.cod == '404') {
            error.innerHTML = `Not valid city. Please input another city`;
            return;
        }

        const WeatherDataDiv = createWeatherDescription(data);
        weatherContainer.appendChild(WeatherDataDiv);

        city.innerHTML = `Current Weather for ${data.name}:`;
        document.getElementById('cityInput').value = '';

    } catch (error) {
        console.log(error);
    }
}


function convertToLocalTime(dt) {
    // Create a new Date object by multiplying the Unix timestamp by 1000 to convert it to milliseconds
    // Will produce a time in the local timezone of user's computer
    const date = new Date(dt * 1000);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours() % 12 || 12).padStart(2, '0'); // Convert 24-hour to 12-hour format
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const period = date.getHours() >= 12 ? 'PM' : 'AM'; // Determine AM/PM

    // Formatted date string in the format: YYYY-MM-DD hh:mm:ss AM/PM
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds} ${period}`;
}

function createWeatherDescription(weatherData) {
    console.log(weatherData)
    const { main, dt, weather, wind } = weatherData;

    const description = document.createElement("div");
    const convertedDateAndTime = convertToLocalTime(dt); // '2023-11-07 07:00:00 PM'

    //Need to display the current temperature,weather description, humidity, and wind speed    
    description.innerHTML = `
        <div class = "weather_description">
         <div>  Temprature: ${main.temp}${temperatureSymobol} </div>
         <div>    Description: ${weather[0].description} </div>
         <div>   Humidity: ${main.humidity}%</div>
         <div>   Wind Speed: ${wind.speed}m/s</div>
         <div>   Date: ${convertedDateAndTime.substring(2, 10)} </div>
         <div>   Time: ${convertedDateAndTime.substring(10)} </div>
        </div>
    `;
    return description;
}

/*{
    "coord": {
        "lon": -97.7431,
        "lat": 30.2672
    },
    "weather": [
        {
            "id": 800,
            "main": "Clear",
            "description": "clear sky",
            "icon": "01d"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 36.01,
        "feels_like": 42.72,
        "temp_min": 34.94,
        "temp_max": 37.56,
        "pressure": 1012,
        "humidity": 49,
        "sea_level": 1012,
        "grnd_level": 989
    },
    "visibility": 10000,
    "wind": {
        "speed": 4.12,
        "deg": 160,
        "gust": 8.23
    },
    "clouds": {
        "all": 0
    },
    "dt": 1720037979,
    "sys": {
        "type": 2,
        "id": 2073627,
        "country": "US",
        "sunrise": 1720006424,
        "sunset": 1720056993
    },
    "timezone": -18000,
    "id": 4671654,
    "name": "Austin",
    "cod": 200
} */


