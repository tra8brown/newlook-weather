var forecastWeatherEl = document.getElementById("wicon");
// function to handle the search button click
function clickhandler() {
    // read the city being searched for
    var inputBox = document.getElementById('location');
    var city = inputBox.value;

    let lat, long;

    // call weather api
    getWeatherData(city).then((weatherData) => {
        // Update the page with the weather data
        var currentLocation = document.getElementById("city");
        currentLocation.innerHTML = city + " " + new Date().toLocaleDateString();
        var tempHeader = document.getElementById("temp");
        var temperature = weatherData.main.temp;
        tempHeader.innerHTML = "Temp: " + temperature;
        console.log("temp:" + temperature);

        lat = weatherData.coord.lat;
        long = weatherData.coord.lon;

        // set wind
        var windElement = document.getElementById("wind");
        var windSpeed = weatherData.wind.speed;
        windElement.innerHTML = "Wind: " + windSpeed;

        //set humidity
        var humidityEl = document.getElementById("humidity");
        var humidity1 = weatherData.main.humidity;
        humidityEl.innerHTML = "Humidity: " + humidity1;

        //set uvIndex
        getUvIndex(lat, long).then((uv) => {
            console.log("uv index: " + uv);
            var uvIndex = document.getElementById("uv");
            uvIndex.innerHTML = "UV Index: " + uv;
        });

        //req weather icon
        var iconUrl = "https://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png";
        forecastWeatherEl.setAttribute("src", iconUrl);

        //if uv index is the number between 0-2 box will be green
        //if uv index is the number between 3-5 box will be yellow
        //if uv index is the number between 6-7 box will be orang
        //if uv index is the number between 8-10 box will be red
        //if uv index is 11+ the box will be purple
        getFiveDayForecast(city).then((forecast) => {
            console.log(forecast);
        });

        // todo - update other parts of the page
    });
}

//req weather data
// Call the weather api to get weather data
async function getWeatherData(location) {
    var apiKey = '80b3f9e346ab1ff77dba0cc32aeb9b9c';
    const response = await fetch("http://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=" + apiKey);
    const json = await response.json();
    return json;
}

async function getFiveDayForecast(location) {
    var apiKey = '80b3f9e346ab1ff77dba0cc32aeb9b9c';
    const response = await fetch("http://api.openweathermap.org/data/2.5/forecast?q=" + location + "&appid=" + apiKey, {});
    const json = await response.json();
    return json;
}

// Call the weather api to get uv index
async function getUvIndex(lat, long) {
    var apiKey = '80b3f9e346ab1ff77dba0cc32aeb9b9c';
    const response = await fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&appid=" + apiKey, {});
    const json = await response.json();
    return json.current.uvi;
}


//populate daily forecast

//populate 5 days

// Set up button click handler
var object = document.getElementById("search-btn");
object.addEventListener("click", clickhandler);