const API_URL = "https://planets-api.vercel.app/api/v1/planets/"; // Mercury

const planetsDiv = document.querySelector(".planets");

let planets = [];

fetch(API_URL)
  .then((res) => res.json())
  .then((data) => {
    console.log("Planets initial", data);

    planets = [...data];
  })
  .catch((err) => console.log(err));

console.log(window.location);

window.addEventListener("hashchange", (event) => {
  // console.log(event)

  console.log(event.target.location.hash);

  console.log("Planets Array", planets);

  let planetName = event.target.location.hash.replace("#/planets/", ""); // #/planets/

  let currentPlanet = planets.find((el) => (el.name == planetName))

  console.log("Current Planet", currentPlanet)

  planetsDiv.innerHTML = `
    <p>${currentPlanet.name}</p>
    <img src="${currentPlanet.images.planet}" />
  `;
});
