//Show weather in any given city when the user submits a search request

//Capture user city input
var cityInputEl = document.getElementById('cityInput');
var searchEl = document.getElementById('searchButton');
var apiKey = "3a41fb29e2c055f4d8aacef579f499c3";

var currentHeaderEl = document.getElementById('cityDateCurrent');
var currentTempEl = document.getElementById('currentTemp');
var currentWindEl = document.getElementById('currentWind');
var currentHumidityEl = document.getElementById('currentHumidity');
var currentUVEl = document.getElementById('currentUV');
//Capture user input and fetch weather for that city
searchEl.addEventListener('click', function() {
    var city = cityInputEl.value;
    fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey
    )
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        if (data.cod !== 200){
            console.log("sorry");
        } else {
            currentHeaderEl.textContent = city + " " + moment().format("MMM Do YY") + " " + data.weather[0].icon;
            console.log(data.weather[0].icon);
        }
    })
    return;
});


// function showWeather() {
//     console.log(data);
// }



