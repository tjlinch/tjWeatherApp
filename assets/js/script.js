//Show weather in any given city when the user submits a search request

//Capture user city input
var cityInputEl = document.getElementById('cityInput');
var searchEl = document.getElementById('searchButton');
var apiKey = "3a41fb29e2c055f4d8aacef579f499c3";

//Capture user input and fetch weather for that city
searchEl.addEventListener('click', function() {
    var city = cityInputEl.value;
    // console.log(city);
    var fetchWeather = fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey
    )
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    })
});






