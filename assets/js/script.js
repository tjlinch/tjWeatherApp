//Show weather in any given city when the user submits a search request

//Variable Declarations
var cityInputEl = document.getElementById('cityInput');
var searchEl = document.getElementById('searchButton');
var searchHistoryEl = document.getElementById('searchHistory');
var apiKey = "3a41fb29e2c055f4d8aacef579f499c3";
var apiKey02 = "68253b2b3ea349f7ad570be3dc400edd";

var currentHeaderEl = document.getElementById('cityDateCurrent');
var currentTempEl = document.getElementById('currentTemp');
var currentWindEl = document.getElementById('currentWind');
var currentHumidityEl = document.getElementById('currentHumidity');
var currentUVEl = document.getElementById('currentUV');
var forecastCardsDiv = document.getElementById('forecastCards');
var savedArray = [];
var savedCities = JSON.parse(localStorage.getItem('savedCitiesString'));
console.log(savedCities);
// if (savedCities !== null) {
//     var searchLimiter = savedCities.length - 6;
//     var searchStart = savedCities.length - 1;
// }


// //for loop to display search history, renders the last 5 items in the array
// for (i = 0; i > savedCities.length; i++) {
//     var savedCity = document.createElement("button");
//     savedCity.textContent = savedCities[i];
//     savedCity.setAttribute('class', 'savedBtn');
//     searchHistoryEl.append(savedCity);
// }


//Capture user input and fetch weather for that city
searchEl.addEventListener('click', function() {
    //capture user input, save values to localStorage, 
    var city = cityInputEl.value;
    // savedCities.push(city);
    savedArray.push(city);
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
        return;
    })

    //fetch data for the 5 day forecast
    fetch(
        "https://api.weatherbit.io/v2.0/forecast/daily?city=" + city + "&country=US&key=" + apiKey02
    )
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        var forecastCard = document.createElement('div');
        forecastCard.setAttribute('class', 'card');
        var forecastUl = document.createElement('ul');
        forecastUl.setAttribute('class', 'forecastUl');
        var forecastDate = document.createElement('li');
        forecastDate.setAttribute('class', 'forecastDate');
        var forecastIcon = document.createElement('li');
        forecastIcon.setAttribute('class', 'forecastIcon');
        var forecastTemp = document.createElement('li');
        forecastTemp.setAttribute('class', 'forecastTemp');
        var forecastWind = document.createElement('li');
        forecastWind.setAttribute('class', 'forecastWind');
        var forecastHumidity = document.createElement('li');
        forecastHumidity.setAttribute('class', 'forecastHumidity');
        forecastDate.textContent = data.data[0].datetime;
        forecastIcon.textContent = data.data[0].weather.icon;
        forecastTemp.textContent = "Temp: " + data.data[0].temp + "°F";
        forecastWind.textContent = "Wind: " + data.data[0].wind_spd + " MPH";
        forecastHumidity.textContent = "Humidity: " + data.data[0].rh + "%";


        forecastUl.append(forecastDate);
        forecastUl.append(forecastIcon);
        forecastUl.append(forecastTemp);
        forecastUl.append(forecastWind);
        forecastUl.append(forecastHumidity);
        forecastCard.append(forecastUl);
        forecastCardsDiv.append(forecastCard);


        
    })
    
});



