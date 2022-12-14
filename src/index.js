import "./style.css";

const apiKey = "3650680fe878433ad9588e6595f3c6f1";
const cityName = "Davos";

function changeLocation() {
  const searchBar = document.querySelector(".search-bar");
  console.log(searchBar.value);
  searchBar.value = "";
}

const units = {
  name: "metric",
  temp: "C",
};

async function getLocationCoords(url) {
  const response = await fetch(url);
  const locationCoords = await response.json();

  return locationCoords;
}
async function getWeatherData(url) {
  const response = await fetch(url);
  const weatherData = await response.json();

  return weatherData;
}

const locationCoordsUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`;

const cityCoords = await getLocationCoords(locationCoordsUrl);
const { lat } = cityCoords[0];
const { lon } = cityCoords[0];

const weatherDataUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units.name}`;

const forecastData = await getWeatherData(weatherDataUrl);
console.log(forecastData);

const content = document.querySelector("#content");
const cards = document.createElement("div");
cards.classList.add("cards");

for (let i = 0; i < (forecastData.list).length / 5; i += 1) {
  const card = document.createElement("div");
  card.classList.add("card");
  const main = document.createElement("div");
  main.classList.add("main");
  main.innerText = forecastData.list[i].weather[0].main;
  const time = document.createElement("div");
  time.classList.add("desc");
  const utc = new Date((forecastData.list[i].dt) * 1000);
  if (utc.getHours() < 1) {
    time.innerText = `${utc.getHours() + 12} AM`;
  } else if (utc.getHours() < 11) {
    time.innerText = `${utc.getHours()} AM`;
  } else {
    time.innerText = `${utc.getHours() - 12} PM`;
  }
  const temp = document.createElement("div");
  temp.classList.add("temp");
  temp.innerText = `${forecastData.list[i].main.temp} °${units.temp}`;
  card.appendChild(time);
  card.appendChild(main);
  card.appendChild(temp);
  cards.appendChild(card);
}
content.appendChild(cards);

const location = document.createElement("div");
location.classList.add("location");
const locationTitle = document.createElement("div");
locationTitle.classList.add("location-title");
locationTitle.innerText = cityName;
const locationSearch = document.createElement("div");
locationSearch.classList.add("location-search");
/* <label for="site-search">Search the site:</label>
<input type="search" id="site-search" name="q">

<button>Search</button> */
const searchLabel = document.createElement("label");
searchLabel.classList.add("search-label");
searchLabel.innerText = "Search for a new location:";
const searchLower = document.createElement("div");
searchLower.classList.add("search-lower");
const searchBar = document.createElement("input");
searchBar.classList.add("search-bar");
searchBar.type = "search";
const searchBtn = document.createElement("button");
searchBtn.classList.add("search-btn");
searchBtn.innerText = "Search";
searchBtn.addEventListener("click", changeLocation);

searchLower.appendChild(searchBar);
searchLower.appendChild(searchBtn);
locationSearch.appendChild(searchLabel);
locationSearch.appendChild(searchLower);
location.appendChild(locationTitle);
location.appendChild(locationSearch);
content.appendChild(location);
