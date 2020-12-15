window.addEventListener("load", function() {
   let form = document.getElementById("listForm");

   form.addEventListener("submit", function(event) {
      let pilotName = document.getElementById("pilotName").value;
      let copilotName = document.getElementById("copilotName").value;
      let fuelLevel = document.getElementById("fuelLevel").value;
      let cargoMass = document.getElementById("cargoMass").value;

      if (pilotName === "" || copilotName === "" || fuelLevel === "" || cargoMass === "") {
            alert("All fields are required!");
            event.preventDefault();
      } else {
         let validString = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/;  // regex for allowing only letters and spaces
         if (!validString.test(pilotName)) {
            alert("Please enter a valid Pilot name.");
            event.preventDefault();
         } else if (!validString.test(copilotName)) {  
            alert("Please enter a valid Copilot name.");
            event.preventDefault();
         } else if (isNaN(parseInt(fuelLevel))) {
            alert("Please enter a valid fuel level.");
            event.preventDefault();
         } else if (isNaN(parseInt(cargoMass))) {
            alert("Please enter a valid cargo mass.");
            event.preventDefault();
         } 
      }

      let faultyItems = document.getElementById("faultyItems");
      let launchStatus = document.getElementById("launchStatus");
      let pilotStatus = document.getElementById("pilotStatus");
      let copilotStatus = document.getElementById("copilotStatus");

      if (fuelLevel < 10000 || cargoMass > 10000) {
         faultyItems.style = "visibility: visible";
         pilotStatus.innerHTML = `Pilot ${pilotName} Ready`;
         copilotStatus.innerHTML = `Co-pilot ${copilotName} Ready`;
         launchStatus.innerHTML = "Shuttle not ready for launch";
         launchStatus.style = "color: red";
         event.preventDefault();
         if (fuelLevel < 10000 && cargoMass > 10000) {
            let fuelStatus = document.getElementById("fuelStatus");
            fuelStatus.innerHTML = "Fuel level too low for launch";
            let cargoStatus = document.getElementById("cargoStatus");
            cargoStatus.innerHTML = "Cargo mass too high for launch";
         }else if (fuelLevel < 10000) {
            let fuelStatus = document.getElementById("fuelStatus");
            fuelStatus.innerHTML = "Fuel level too low for launch";
         } else if (cargoMass > 10000) {
            let cargoStatus = document.getElementById("cargoStatus");
            cargoStatus.innerHTML = "Cargo mass too high for launch";
         } 
      } else {
         launchStatus.innerHTML = "Shuttle is ready for launch";
         launchStatus.style = "color: green";
         faultyItems.style = "visibility: hidden";
         event.preventDefault();
      }
   });
});

window.addEventListener("load", async() => {
   try {
      let res = await fetch('https://handlers.education.launchcode.org/static/planets.json');
      let data = await res.json();
      let missionTarget = document.getElementById("missionTarget");
      let randomIndex = Math.floor(Math.random()*data.length);

      missionTarget.innerHTML = `
      <h2>Mission Destination</h2>
         <ol>
            <li>Name: ${data[randomIndex].name}</li>
            <li>Diameter: ${data[randomIndex].diameter}</li>
            <li>Star: ${data[randomIndex].star}</li>
            <li>Distance from Earth: ${data[randomIndex].distance}</li>
            <li>Number of Moons: ${data[randomIndex].moons}</li>
         </ol>
         <img src="${data[randomIndex].image}">`
      console.log(data);
   } catch (err) {
      console.error(err);
   }
})