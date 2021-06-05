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

        getUvIndex(lat, long).then((uv) => {
            console.log("uv index: " + uvIndex);
            var uvIndex = document.getElementById("uv");
            uvIndex.innerHTML = "UV Index: " + uv;
        });

        getFiveDayForecast(city).then((forecast) => {
            console.log(forecast);
        });

        // todo - update other parts of the page
    });
}
//http://api.openweathermap.org/data/2.5/weather?q=Salt%20Lake%20City,%20UT,%20USA&appid=80b3f9e346ab1ff77dba0cc32aeb9b9c
//req weather data
// Call the weather api to get weather data
async function getWeatherData(location) {
    var apiKey = '80b3f9e346ab1ff77dba0cc32aeb9b9c';
    const response = await fetch("http://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=" + apiKey, {});
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

// Set up button click handler
var object = document.getElementById("search-btn");
object.addEventListener("click", clickhandler);