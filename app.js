// =====================
// Machine data
// =====================

let machines = [];


// =====================
// DOM elements
// =====================

const machineContainer = document.getElementById("machine-container");
const machineDetails = document.getElementById("machine-details");

const searchInput = document.getElementById("search-input");
const statusDropdown = document.getElementById("status-dropdown");
const sortDropdown = document.getElementById("sort-dropdown");

const runningCount = document.getElementById("running-count");
const maintenanceCount = document.getElementById("maintenance-count");
const offlineCount = document.getElementById("offline-count");


// =====================
// Functions
// =====================

// Load machine-data from JSON file
async function loadMachines() {

    machineContainer.innerHTML = `
        <p>Loading machines...</p>
    `;

    try {
        const response = await fetch("data/machines.json");

        if(!response.ok) {
          throw new Error("Failed to load machine data.");
        }

        const data = await response.json();

        machines = data;

        renderMachines();
        updateSummary();

    } catch (error) {
        console.error(error);

        machineContainer.innerHTML = `
            <p class="error-message">
                Machines could not be loaded.
            </p>
        `;
    }
}

// Render machine cards based on search, status and sorting
function renderMachines() {
    const searchText = searchInput.value.toLowerCase();

    // Create a copy so the original machines array is not modified
    const sortedMachines = [...machines];

    // Sort machines
    if (sortDropdown.value === "name") {
        sortedMachines.sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });
    } else if (sortDropdown.value === "hours") {
        sortedMachines.sort(function (a, b) {
            return a.operatingHours - b.operatingHours;
        });
    } else if (sortDropdown.value === "temperature") {
        sortedMachines.sort(function (a, b) {
            return a.temperature - b.temperature;
        });
    }

    machineContainer.innerHTML = "";

    let foundMachines = 0;

    for (const machine of sortedMachines) {
        const machineName = machine.name.toLowerCase();

        // Skip machines that do not match the search
        if (!machineName.includes(searchText)) {
            continue;
        }

        // Skip machines that do not match the selected status
        if (
            statusDropdown.value !== "All" &&
            machine.status !== statusDropdown.value
        ) {
            continue;
        }

        // Create one machine card
        const card = document.createElement("div");
        card.classList.add("machine-card");

        card.innerHTML = `
          <h3>${machine.name}</h3>

          <p>
              Status:
              <span class="status-badge ${machine.status.toLowerCase()}">
                  ${machine.status}
              </span>
          </p>

          <p>Operating hours: ${machine.operatingHours}</p>
          <p>Location: ${machine.location}</p>
          <p>Temperature: ${machine.temperature} °C</p>
      `;

    // unselect card for select
    card.addEventListener("click", function () {
        const selectedCard = document.querySelector(".machine-card.selected");

        if (selectedCard) {
            selectedCard.classList.remove("selected");
        }

        card.classList.add("selected");

        showMachineDetails(machine);
    });

    // Add the finished card to the page
    machineContainer.append(card);

    foundMachines++;
  }

  if (foundMachines === 0) {
      machineContainer.innerHTML = `
          <p class="empty-message">
              No machines match your search. Try another search or filter.
          </p>
      `;
  }
}

// Count machines by status
function updateSummary() {
    let running = 0;
    let maintenance = 0;
    let offline = 0;

    for (const machine of machines) {
        if (machine.status === "Running") {
            running++;
        } else if (machine.status === "Maintenance") {
            maintenance++;
        } else if (machine.status === "Offline") {
            offline++;
        }
    }

    runningCount.textContent = running;
    maintenanceCount.textContent = maintenance;
    offlineCount.textContent = offline;
}

function showMachineDetails(machine) {
    machineDetails.innerHTML = `
        <div class="details-header">
            <div>
                <p class="details-label">Selected machine</p>
                <h3>${machine.name}</h3>
            </div>

            <span class="status-badge ${machine.status.toLowerCase()}">
                ${machine.status}
            </span>
        </div>

        <div class="details-grid">
            <div class="detail-item">
                <span>Operating hours</span>
                <strong>${machine.operatingHours} h</strong>
            </div>

            <div class="detail-item">
                <span>Temperature</span>
                <strong>${machine.temperature} °C</strong>
            </div>

            <div class="detail-item">
                <span>Location</span>
                <strong>${machine.location}</strong>
            </div>
        </div>
    `;
}


// =====================
// Event listeners
// =====================

searchInput.addEventListener("input", function () {
    renderMachines();
});

statusDropdown.addEventListener("change", function () {
    renderMachines();
});

sortDropdown.addEventListener("change", function () {
    renderMachines();
});

document.addEventListener("click", function (event) {
    const clickedCard = event.target.closest(".machine-card");

    if (!clickedCard) {
        const selectedCard = document.querySelector(".machine-card.selected");

        if (selectedCard) {
            selectedCard.classList.remove("selected");
        }
    }
});

// =====================
// Initial rendering
// =====================

loadMachines();