var forecastWeatherEl = document.getElementById("wicon");
var cities = [];
// function to handle the search button click
function clickhandler() {
    // read the city being searched for
    var inputBox = document.getElementById('location');
    var city = inputBox.value;
    cities.push(city);
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
        console.log(weatherData.main);

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
            var uvDiv = document.getElementById("uv-div");

            //color uv 
            var color = "";
            if (uv >= 0 && uv <= 2) {
                color = "green";
            } else if (uv >= 3 && uv <= 5) {
                color = "yellow";
            } else if (uv >= 6 && uv <= 7) {
                color = "orange";
            } else if (uv >= 8 && uv <= 10) {
                color = "red";
            } else if (uv >= 11) {
                color = "purple";
            }
            uvDiv.style.backgroundColor = color;
        });

        //req weather icon
        var iconUrl = "https://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png";
        forecastWeatherEl.setAttribute("src", iconUrl);
        //5 day forecast
        getFiveDayForecast(city).then((fiveDayForecast) => {
            var currentLocation = document.getElementById("fiveDay");
            currentLocation.innerHTML = city;
            //DAY 1!!!!
            var day1 = fiveDayForecast.list[1];
            var temp1 = document.getElementById("temp1");
            var temperature = day1.main.temp;
            temp1.innerHTML = "Temp: " + temperature;
            // set wind
            var wind1 = document.getElementById("wind1");
            var windSpeed = day1.wind.speed;
            wind1.innerHTML = "Wind: " + windSpeed;
            //set humidity
            var humidity1 = document.getElementById("humidity1");
            var humidity = day1.main.humidity;
            humidity1.innerHTML = "Humidity: " + humidity;
            //weather icon
            var iconUrl = "https://openweathermap.org/img/wn/" + day1.weather[0].icon + "@2x.png";
            var icon1 = document.getElementById("wicon1");
            icon1.setAttribute("src", iconUrl);
            //DAY 2!!!!
            var day2 = fiveDayForecast.list[2];
            var temp2 = document.getElementById("temp2");
            var temperature2 = day2.main.temp;
            temp2.innerHTML = "Temp: " + temperature2;
            // set wind
            var wind2 = document.getElementById("wind2");
            var windSpeed2 = day2.wind.speed;
            wind2.innerHTML = "Wind: " + windSpeed2;
            //set humidity
            var humidity2 = document.getElementById("humidity2");
            var humidity = day2.main.humidity;
            humidity2.innerHTML = "Humidity: " + humidity;
            //weather icon
            var iconUrl = "https://openweathermap.org/img/wn/" + day2.weather[0].icon + "@2x.png";
            var icon2 = document.getElementById("wicon2");
            icon2.setAttribute("src", iconUrl);
            //DAY 3!!!!
            var day3 = fiveDayForecast.list[3];
            var temp3 = document.getElementById("temp3");
            var temperature = day3.main.temp;
            temp3.innerHTML = "Temp: " + temperature;
            // set wind
            var wind3 = document.getElementById("wind3");
            var windSpeed3 = day3.wind.speed;
            wind3.innerHTML = "Wind: " + windSpeed3;
            //set humidity
            var humidity3 = document.getElementById("humidity3");
            var humidity = day3.main.humidity;
            humidity3.innerHTML = "Humidity: " + humidity;
            //weather icon
            var iconUrl = "https://openweathermap.org/img/wn/" + day3.weather[0].icon + "@2x.png";
            var icon3 = document.getElementById("wicon3");
            icon3.setAttribute("src", iconUrl);
            //DAY 4!!!
            var day4 = fiveDayForecast.list[4];
            var temp4 = document.getElementById("temp4");
            var temperature = day4.main.temp;
            temp4.innerHTML = "Temp: " + temperature;
            // set wind1
            var wind4 = document.getElementById("wind4");
            var windSpeed4 = day4.wind.speed;
            wind4.innerHTML = "Wind: " + windSpeed4;
            //set humidity
            var humidity4 = document.getElementById("humidity4");
            var humidity = day4.main.humidity;
            humidity4.innerHTML = "Humidity: " + humidity;
            //weather icon
            var iconUrl = "https://openweathermap.org/img/wn/" + day4.weather[0].icon + "@2x.png";
            var icon4 = document.getElementById("wicon4");
            icon4.setAttribute("src", iconUrl);
            //DAY 5!!!!
            var day5 = fiveDayForecast.list[5];
            var temp5 = document.getElementById("temp5");
            var temperature = day5.main.temp;
            temp5.innerHTML = "Temp: " + temperature;
            // set wind1
            var wind5 = document.getElementById("wind5");
            var windSpeed = day5.wind.speed;
            wind5.innerHTML = "Wind: " + windSpeed;
            //set humidity
            var humidity5 = document.getElementById("humidity5");
            var humidity = day5.main.humidity;
            humidity5.innerHTML = "Humidity: " + humidity;
            //weather icon
            var iconUrl = "https://openweathermap.org/img/wn/" + day5.weather[0].icon + "@2x.png";
            var icon5 = document.getElementById("wicon5");
            icon5.setAttribute("src", iconUrl);
        });

        // todo - update other parts of the page
    });
    var list = document.getElementById("history");
    list.innerHTML = "";
    cities.forEach(city => {
        var li = document.createElement("button");
        li.appendChild(document.createTextNode(city));
        list.appendChild(li);
    });
}

// Call the weather api to get weather data
async function getWeatherData(location) {
    var apiKey = '80b3f9e346ab1ff77dba0cc32aeb9b9c';
    const response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + location + "&units=imperial" + "&appid=" + apiKey);
    const json = await response.json();
    return json;
}

async function getFiveDayForecast(location) {
    var apiKey = '80b3f9e346ab1ff77dba0cc32aeb9b9c';
    const response = await fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + location + "&appid=" + apiKey + "&units=imperial", {});
    const json = await response.json();
    return json;
}

// Call the weather api to get uv index
async function getUvIndex(lat, long) {
    var apiKey = '80b3f9e346ab1ff77dba0cc32aeb9b9c';
    const response = await fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&appid=" + apiKey + "&units=imperial", {});
    const json = await response.json();
    return json.current.uvi;
}


// Set up button click handler
var object = document.getElementById("search-btn");
object.addEventListener("click", clickhandler);