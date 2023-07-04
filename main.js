const API_URL = "https://planets-api.vercel.app/api/v1/planets/"; // Mercury

const planetsDiv = document.querySelector(".planets");
const planetsSpecs = document.querySelector(".planetsSpecs");

let planets = [];

const fetchPlanets = () => {
  fetch(API_URL)
    .then((res) => res.json())
    .then((data) => {
      console.log("Planets initial", data);
      planets = [...data];
      renderPlanetsHTML("Mercury");
    })
    .catch((err) => console.log(err));
};

console.log(window.location);

function renderPlanetsHTML(defaultPlanet) {
  console.log(window.location.hash);

  console.log("Planets Array", planets);

  let planetName;

  if (defaultPlanet) {
    planetName = defaultPlanet;
  } else {
    planetName = window.location.hash.replace("#/planets/", ""); // #/planets/
  }
  console.log(planetName);

  let currentPlanet = planets.find((el) => el.name == planetName);

  console.log("Current Planet", currentPlanet);

  planetsDiv.innerHTML = `
    <div class="imageWrapper">
      <img class="planetsImg" src="${currentPlanet.images.planet}" />
      <img class="geologyImg" style="display: none"/>
    </div>

    <div class="planetsText">
      <h1>${currentPlanet.name}</h1>
      <p class="planetTextString">${currentPlanet.overview.content}</p>
      <br />
      <p>Source: <a class="planetSource" href="" target="_blank">Wikipedia</a> </p>

      <div class="tabs">
        <div class="tab tab__active" data-tab="planet"><span>1</span><p>Overview</p></div> 
        <div class="tab" data-tab="internal"><span>2</span><p>Internal Structure</p></div> 
        <div class="tab" data-tab="geology"><span>3</span><p>Surface Geology</p></div> 
      </div>

    </div>
  `;

  const tabs = document.querySelectorAll(".tab");

  const planetsImg = document.querySelector(".planetsImg");
  const planetTextString = document.querySelector(".planetTextString");
  const planetSource = document.querySelector(".planetSource")

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const selectedTab = tab.getAttribute("data-tab");
      console.log("Selected Tab:", selectedTab);

      tabs.forEach((tabActiveItem) => {
        tabActiveItem.classList.remove("tab__active");
      });

      tab.classList.add("tab__active");

      // Change Text

      if (selectedTab === "planet") {
        planetTextString.textContent = currentPlanet.overview.content;
        planetSource.href = currentPlanet.overview.source
      } else if (selectedTab === "internal") {
        planetTextString.textContent = currentPlanet.structure.content;
        planetSource.href = currentPlanet.structure.source
      } else if (selectedTab === "geology") {
        planetTextString.textContent = currentPlanet.geology.content;
        planetSource.href = currentPlanet.geology.source
      }

      const geologyIMG = document.querySelector(".geologyImg");

      if (selectedTab !== "geology") {
        planetsImg.src = currentPlanet.images[selectedTab];
        geologyIMG.style.display = "none";
      } else {
        planetsImg.src = currentPlanet.images.planet;

        const planetNameToLower = currentPlanet.name.toLowerCase();

        const geologyImageSrc = `assets/images/geology-${planetNameToLower}.png`;

        // console.log(geologyImage)

        planetsImg.src = currentPlanet.images.planet;

        geologyIMG.src = geologyImageSrc;
        geologyIMG.style.display = "block";
      }
      // console.log(planetsImg.src);
    });
  });

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
}

fetchPlanets();

window.addEventListener("hashchange", (event) => renderPlanetsHTML(null));
