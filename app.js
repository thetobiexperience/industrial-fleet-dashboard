// =====================
// Machine data
// =====================

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
    },
    {
        name: "Bulldozer 05",
        status: "Running",
        operatingHours: 4128,
        location: "Aachen",
        temperature: 74
    },
    {
        name: "Forklift 06",
        status: "Maintenance",
        operatingHours: 1875,
        location: "Leverkusen",
        temperature: 58
    },
    {
        name: "Dump Truck 07",
        status: "Running",
        operatingHours: 6982,
        location: "Essen",
        temperature: 81
    },
    {
        name: "Compactor 08",
        status: "Offline",
        operatingHours: 2956,
        location: "Dortmund",
        temperature: 24
    },
    {
        name: "Telehandler 09",
        status: "Running",
        operatingHours: 3564,
        location: "Koblenz",
        temperature: 69
    },
    {
        name: "Concrete Mixer 10",
        status: "Maintenance",
        operatingHours: 4411,
        location: "Siegen",
        temperature: 63
    }
];


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

    // Show this machine's details when its card is clicked
    card.addEventListener("click", function () {
        showMachineDetails(machine);
    });

    // Add the finished card to the page
    machineContainer.append(card);
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

renderMachines();
updateSummary();