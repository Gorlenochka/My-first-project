/*let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },
  oslo: {
    temp: -5,
    humidity: 20,
  },
};

// write your code here
let city = prompt("Enter a city").trim();

let cityToLowerCase = city.toLowerCase();

if (
  cityToLowerCase === "paris" ||
  cityToLowerCase === "oslo" ||
  cityToLowerCase === "tokyo" ||
  cityToLowerCase === "lisbon" ||
  cityToLowerCase === "san francisco"
) {
  let tempCel = Math.round(weather[cityToLowerCase].temp);
  let tempF = tempCel + 47;
  let cityHumidity = weather[cityToLowerCase].humidity;
  alert(
    "It is currently " +
      tempCel +
      "°C (" +
      tempF +
      "°F) in " +
      city +
      " with a humidity of " +
      cityHumidity +
      "%"
  );
} else {
  alert(
    `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`
  );
}*/

//Date and time

let dateToday = new Date();
let yearToday = dateToday.getFullYear();
let months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];
let monthToday = months[dateToday.getMonth()];
let dataToday = dateToday.getDate();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let dayToday = days[dateToday.getDay()];

let today = document.querySelector("#date-today");
today.innerHTML =
  dayToday + " " + dataToday + "." + monthToday + "." + yearToday;

let hours = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09"];
let hour = dateToday.getHours();
let minutes = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09"];
let min = dateToday.getMinutes();
let currentTime = document.querySelector("#time");

if (min < "10" && hour < "10") {
  currentTime.innerHTML = hours[hour] + "." + minutes[min];
} else if (min > "10" && hour < "10") {
  currentTime.innerHTML = hours[hour] + "." + min;
} else if (min < "10" && hour > "10") {
  currentTime.innerHTML = hour + "." + minutes[min];
} else {
  currentTime.innerHTML = hour + "." + min;
}

//Search form

function showTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureToday = document.querySelector("#temperature");
  temperatureToday.innerHTML = `${temperature}`;
  let precipitation = response.data.main.humidity;
  let precipitationToday = document.querySelector("#precipitation-today");
  precipitationToday.innerHTML = `${precipitation}`;
  let pressure = response.data.main.pressure;
  let pressureToday = document.querySelector("#pressure-today");
  pressureToday.innerHTML = `${pressure}`;
  let windSpeed = response.data.wind.speed;
  let windSpeedToday = document.querySelector("#wind-speed-today");
  windSpeedToday.innerHTML = `${windSpeed}`;
}

function search(event) {
  event.preventDefault();
  let searchInputValue = document.querySelector("#search-a-city");
  let searchCity = document.querySelector("#search-city");
  searchCity.innerHTML = `${searchInputValue.value}`;
  let city = `${searchInputValue.value}`;
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemp);
}

let searchForm = document.querySelector("#go");
searchForm.addEventListener("click", search);

// Current Position

function showPosition(position) {
  let currentPosition = position.data.city;
  let currentCity = document.querySelector("#search-city");
  currentCity.innerHTML = `${currentPosition}`;
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentPosition}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function current(event) {
  event.preventDefault();
  let apiKeyPosition = "d802faa0-10bd-11ec-b2fe-47a0872c6708";
  let apiUrlPosition = `https://geolocation-db.com/json/${apiKeyPosition}`;
  axios.get(apiUrlPosition).then(showPosition);
}

let currentForm = document.querySelector("#current");
currentForm.addEventListener("click", current);

// Celsius-Fahrenheit

function fahrenheit(event) {
  event.preventDefault();
  let temperatureToday = document.querySelector("#temperature");
  let done = document.querySelector(".done");
  if (temperatureToday !== done) {
    let temperatureCelsius = parseInt(
      document.querySelector("#temperature").textContent
    );
    let temperatureFahrenheit = temperatureCelsius + 47;
    temperatureToday.innerHTML = temperatureFahrenheit;
    temperatureToday.classList.add("done");
  }
}

let clickFahrenheit = document.querySelector("#fahrenheit");
clickFahrenheit.addEventListener("click", fahrenheit);

function celsius(event) {
  event.preventDefault();
  let temperatureToday = document.querySelector("#temperature");
  let done = document.querySelector(".done");
  if (temperatureToday === done) {
    let temperatureFahrenheit = parseInt(
      document.querySelector("#temperature").textContent
    );
    let temperatureCelsius = temperatureFahrenheit - 47;
    temperatureToday.innerHTML = temperatureCelsius;
    temperatureToday.classList.remove("done");
  }
}

let clickCelsius = document.querySelector("#celsius");
clickCelsius.addEventListener("click", celsius);
