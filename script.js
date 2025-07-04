// Filter button
document.getElementById("filterBtn").addEventListener("click", function () {
  let area = document.getElementById("areaInput").value;
  loadStaff(area);
});


function createStaffCard(person, staffMember, cardId) {
  return `
    <div class="col-md-4 mb-4">
      <div class="card animate__animated animate__zoomIn h-100 text-center shadow-sm" id="${cardId}" style="cursor: pointer;">
        <img src="${person.picture.medium}" class="card-img-top rounded-circle mx-auto mt-3" style="width: 100px; height: 100px;" alt="Staff">
        <div class="card-body">
          <h5 class="card-title">${person.name.first} ${person.name.last}</h5>
          <p class="card-text"><strong>Research Area:</strong> ${staffMember.research_area}</p>
        </div>
      </div>
    </div>
  `;
}


// Function to show user-friendly errors
function showErrorMessage(message) {
  document.getElementById("staffContainer").innerHTML = `
    <div class="alert alert-danger" role="alert">
      ${message}
    </div>
  `;
}

// Main function to load and display staff
function loadStaff(area = null) {
  document.getElementById("staffContainer").innerHTML = "";

  // Get 10 random users from the external API
  fetch("https://randomuser.me/api/?results=10")
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to fetch random users.");
      }
      return response.json();
    })
    .then(userData => {
      let people = userData.results;

      // Fetch staff data from backend
      let apiUrl = "https://opulent-space-robot-7qr4q6ww6j9cwp96-8000.app.github.dev/";
      if (area) {
        apiUrl += "?area=" + encodeURIComponent(area);
      }

      // Fetch data from your backend API
      fetch(apiUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error("Failed to fetch staff data.");
          }
          return response.json();
        })
        .then(backendData => {
          if (backendData.length === 0) {
            document.getElementById("staffContainer").innerHTML = "<p>No staff found for this area.</p>";
            return;
          }

          backendData.forEach((staffMember, index) => {
            let person = people[index % people.length];
            let cardId = `staffCard${index}`;

            const cardHTML = createStaffCard(person, staffMember, cardId);
            document.getElementById("staffContainer").innerHTML += cardHTML

            // Add click event to card to show modal
            setTimeout(() => {
              document.getElementById(cardId).addEventListener("click", () => {
                document.getElementById("modalContent").innerHTML = `
                  <img src="${person.picture.medium}" class="rounded-circle d-block mx-auto mb-3 mt-2" style="width: 150px; height: 150px;" alt="Staff">
                  <p><i class="fas fa-user"></i> <strong>Name:</strong> ${person.name.title} ${person.name.first} ${person.name.last}</p>
                  <p><i class="fas fa-envelope"></i> <strong>Email:</strong> ${person.email}</p>
                  <p><i class="fas fa-map-marker-alt"></i> <strong>Location:</strong> ${person.location.city}, ${person.location.country}</p>
                  <p><i class="fas fa-flask"></i> <strong>Research Area:</strong> ${staffMember.research_area}</p>
                  <p><i class="fas fa-id-badge"></i> <strong>Staff ID:</strong> ${staffMember.id}</p>
                `;
                const modal = new bootstrap.Modal(document.getElementById("staffModal"));
                modal.show();
              });
            }, 0);
          });
        })
        .catch(error => {
          console.error("Backend API error:", error);
          showErrorMessage("Something went wrong fetching staff data. Please try again later.");
        });
    })
    .catch(error => {
      console.error("Random User API error:", error);
      showErrorMessage("Something went wrong fetching user profiles. Please refresh and try again.");
    });
}

// Load everything when the page loads
loadStaff();
