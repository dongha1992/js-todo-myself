const timezone = document.querySelector(".timezone");
const degreeContainer = document.querySelector(".tem-container");
const degree = document.querySelector(".tem-container h1");
const defaultDegreee = document.querySelector(".tem-container span");

const iconText = document.querySelector(".icon-container .descript");

const COORDS = "coords";
const proxy = "https://cors-anywhere.herokuapp.com/";

/*
	const API_KEY = "f20b980603cf5c8700dfff398b2c001b";
	*/

function getWeather(latitude, longitude) {
  fetch(
    `${proxy}https://api.darksky.net/forecast/0d9f68980fcc5979828ff8b5bdf741bb/${latitude},${longitude}`
  )
    .then(Response => {
      return Response.json();
    })
    .then(json => {
      console.log(json);

      timezone.textContent = json.timezone;
      degree.textContent = json.currently.temperature;
      iconText.textContent = json.currently.summary;
      icon = json.currently.icon;
      setIcons(icon, document.querySelector(".icon"));
      degreeContainer.addEventListener("click", function() {
        let celsious = (degree.textContent - 32) * (5 / 9);
        if (defaultDegreee.textContent === "F") {
          defaultDegreee.textContent = "C";
          degree.textContent = Math.floor(celsious);
        } else {
          defaultDegreee.textContent = "F";
          degree.textContent = json.currently.temperature;
        }
      });
    });
}

/*
	    .then(function(Response) {
	      return Response.json();
	    })
	    .then(function(json) {});
	    */

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function errorGeo(text) {
  alert("can not access");
}

function completedGeo(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function askCoords() {
  navigator.geolocation.getCurrentPosition(completedGeo, errorGeo);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function setIcons(icon, iconID) {
  const skycons = new Skycons({ color: "white" });
  currentIcon = icon.replace(/-/g, "_").toUpperCase();
  skycons.play();
  return skycons.set(iconID, Skycons[currentIcon]);
}

function init() {
  loadCoords();
}
init();
