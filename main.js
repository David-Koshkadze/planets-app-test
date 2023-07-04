const API_URL = "https://planets-api.vercel.app/api/v1/planets/"; // Mercury

const planetsDiv = document.querySelector(".planets");
const planetsSpecs = document.querySelector(".planetsSpecs");

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

  let currentPlanet = planets.find((el) => el.name == planetName);

  console.log("Current Planet", currentPlanet);

  planetsDiv.innerHTML = `
    <img src="${currentPlanet.images.planet}" />

    <div class="planetsText">
      <h1>${currentPlanet.name}</h1>
      <p>${currentPlanet.overview.content}</p>
      <br />
      <p>Source: <a href="" target="_blank">Wikipedia</a> </p>

      <div class="tabs">
        <div class="tab tab__active" data-tab="overview"><span>1</span><p>Overview</p></div> 
        <div class="tab" data-tab="structure"><span>2</span><p>Internal Structure</p></div> 
        <div class="tab" data-tab="geology"><span>3</span><p>Surface Geology</p></div> 
      </div>

    </div>
  `;

  planetsSpecs.innerHTML = `
    <div>
    <span class="planetsSpecsSpan">ROTATION TIME</span>
    <p>${currentPlanet.rotation}</p>
    </div>   

    <div>
    <span class="planetsSpecsSpan">REVOLUTION TIME</span>
    <p>${currentPlanet.revolution}</p>
    </div>   

    <div>
    <span class="planetsSpecsSpan">RADIUS</span>
    <p>${currentPlanet.radius}</p>
    </div>   

    <div>
    <span class="planetsSpecsSpan">AVERAGE TEMP.</span>
    <p>${currentPlanet.temperature}</p>
    </div>   
  `;
});
