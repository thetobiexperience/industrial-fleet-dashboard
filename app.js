// Machine data for the dashboard
const machines = [
  {
    name: "Excavator 01",
    status: "Running",
    operatingHours: 2341,
    location: "Cologne",
    temperature: 78
  },
  {
    name: "Generator 02",
    status: "Maintenance",
    operatingHours: 5120,
    location: "Bonn",
    temperature: 64
  },
  {
    name: "Loader 03",
    status: "Offline",
    operatingHours: 3890,
    location: "Düsseldorf",
    temperature: 22
  },
  {
    name: "Crane 04",
    status: "Running",
    operatingHours: 1622,
    location: "Mainz",
    temperature: 71
  }
];

//HTML Elements
const machineContainer = document.getElementById("machine-container");
const searchInput = document. getElementById("search-input");

//Render all machine cards
function renderMachines() {

  //Read the current search text and ignore upper/lower case
  const searchText = searchInput.value.toLowerCase();

    let cards = "";

    for (const machine of machines) {

      //Make the machine name lowercase for comparison
      const machineName = machine.name.toLowerCase();

      //Skip machines that do not match the search text
      if (!machineName.includes(searchText)) {
        continue;
      }

      cards += `
          <div class="machine-card">
            <h3>${machine.name}</h3>
            <p>Status: ${machine.status}</p>
            <p>Operating hours: ${machine.operatingHours}</p>
            <p>Temperature: ${machine.temperature}</p>
          </div>
      `;

    }

    machineContainer.innerHTML = cards;
}

//React to user input
searchInput.addEventListener("input", function() {
  renderMachines();
});

//Initial rendering
renderMachines();