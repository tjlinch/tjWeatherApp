//Show weather in any given city when the user submits a search request

//Variable Declarations
var cityInputEl = document.getElementById('cityInput');
var searchEl = document.getElementById('searchButton');
var searchHistoryEl = document.getElementById('searchHistory');
var apiKey = "3a41fb29e2c055f4d8aacef579f499c3";

var currentHeaderEl = document.getElementById('cityDateCurrent');
var currentTempEl = document.getElementById('currentTemp');
var currentWindEl = document.getElementById('currentWind');
var currentHumidityEl = document.getElementById('currentHumidity');
var currentUVEl = document.getElementById('currentUV');
var savedArray = [];
var savedCities = JSON.parse(localStorage.getItem('savedCitiesString'));
console.log(savedCities);
if (savedCities !== null) {
    var searchLimiter = savedCities.length - 6;
    var searchStart = savedCities.length - 1;
}


//for loop to display search history, renders the last 5 items in the array
for (i = searchStart; i > searchLimiter; i--) {
    var savedCity = document.createElement("button");
    savedCity.textContent = savedCities[i];
    savedCity.setAttribute('class', 'savedBtn');
    searchHistoryEl.append(savedCity);
}


//Capture user input and fetch weather for that city
searchEl.addEventListener('click', function() {
    //capture user input, save values to localStorage, 
    var city = cityInputEl.value;
    savedArray.push(city);
    // console.log(searchArray);
    localStorage.setItem('savedCitiesString', JSON.stringify(savedArray));


    //fetch and return the current weather conditions to the user
    fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey
    )
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        // console.log(data);
        if (data.cod !== 200){
            //display message if input causes an error while retrieving data
            console.log("sorry");
        } else {
            currentHeaderEl.textContent = city + " " + moment().format("MMM Do YY") + " " + data.weather[0].icon;
            currentTempEl.textContent = "Temp: " + data.main.temp + "°F";
            currentWindEl.textContent = "Wind: " + data.wind.speed + " MPH";
            currentHumidityEl.textContent = "Humidity: " + data.main.humidity + " %";
            currentUVEl.textContent = "UV Index: " + "placeholder";

        }
    })
    return;
});
