// Logs name input
document.getElementById("logNameBtn").addEventListener("click", function () {
  let name = document.getElementById("nameInput").value;
  console.log("You entered: " + name);
});

// Filter button
document.getElementById("filterBtn").addEventListener("click", function () {
  let area = document.getElementById("areaInput").value;
  loadStaff(area);
});

// Main function to load and display staff
function loadStaff(area = null) {
  document.getElementById("staffContainer").innerHTML = "";

  // Get 10 random users
  fetch("https://randomuser.me/api/?results=10")
    .then(response => response.json())
    .then(userData => {
      let people = userData.results;

      // Fetch staff data from backend
      let apiUrl = "http://127.0.0.1:5000/staff";
      if (area) {
        apiUrl += "?area=" + encodeURIComponent(area);
      }

      fetch(apiUrl)
        .then(response => response.json())
        .then(backendData => {
          if (backendData.length === 0) {
            document.getElementById("staffContainer").innerHTML = "<p>No staff found for this area.</p>";
            return;
          }

          backendData.forEach((staffMember, index) => {
            let person = people[index % people.length];
            let cardId = `staffCard${index}`;

            document.getElementById("staffContainer").innerHTML += `
              <div class="col-md-4 mb-4">
                <div class="card h-100 text-center shadow-sm" id="${cardId}" style="cursor: pointer;">
                  <img src="${person.picture.medium}" class="card-img-top rounded-circle mx-auto mt-3" style="width: 100px; height: 100px;" alt="Staff">
                  <div class="card-body">
                    <h5 class="card-title">${person.name.first} ${person.name.last}</h5>
                    <p class="card-text"><strong>Research Area:</strong> ${staffMember.research_area}</p>
                  </div>
                </div>
              </div>
            `;

            // Add click event to card to show modal
            setTimeout(() => {
              document.getElementById(cardId).addEventListener("click", () => {
                document.getElementById("modalContent").innerHTML = `
                  <img src="${person.picture.medium}" class="card-img-top rounded-circle mx-auto mt-3" style="width: 100px; height: 100px;" alt="Staff">
                  <p><strong>Name:</strong> ${person.name.title} ${person.name.first} ${person.name.last}</p>
                  <p><strong>Email:</strong> ${person.email}</p>
                  <p><strong>Location:</strong> ${person.location.city}, ${person.location.country}</p>
                  <p><strong>Research Area:</strong> ${staffMember.research_area}</p>
                  <p><strong>Staff ID:</strong> ${staffMember.id}</p>
                `;
                const modal = new bootstrap.Modal(document.getElementById("staffModal"));
                modal.show();
              });
            }, 0);
          });
        });
    })
    .catch(error => console.error("Error fetching data:", error));
}

// Load everything when the page loads
loadStaff();
