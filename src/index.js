import "./style.css";

const apiKey = "3650680fe878433ad9588e6595f3c6f1";
const content = document.querySelector("#content");
const temp = document.createElement("div");
let location;

const successCallback = (position) => {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  const locationURL = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`;
  fetch(
    locationURL,
    { mode: "cors" },
  )
    .then((response) => response.json())
    .then((response) => {
      location = response[0].name;
    });
};

const errorCallback = (error) => {
  console.log(error);
  location = "Ottawa";
};

navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${apiKey}&units=metric`;

fetch(
  url,
  { mode: "cors" },
)
  .then((response) => console.log(response.json()));
// .then((response) => {
//   temp.innerText = response.main.temp;
// });
const greeting = document.createElement("h1");
greeting.innerText = "Welcome";
content.appendChild(temp);
content.appendChild(greeting);
