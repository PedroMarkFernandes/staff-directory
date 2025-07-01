// Logs name input
document.getElementById("logNameBtn").addEventListener("click", function () {
  let name = document.getElementById("nameInput").value;
  console.log("You entered: " + name);
});
// Clears the input field after logging
document.getElementById("nameInput").value = "";


// Triggers staff reload with a filter when button clicked
document.getElementById("filterBtn").addEventListener("click", function () {
  let area = document.getElementById("areaInput").value;
  loadStaff(area); // Pass filter value to loadStaff()
});

function loadStaff(area = null) {
  // Clears previous results
  document.getElementById("staffContainer").innerHTML = "";

  // Gets random user from external API
  fetch("https://randomuser.me/api/")
    .then(response => response.json())
    .then(userData => {
      let person = userData.results[0];

      // Builds backend API URL
      let apiUrl = "http://127.0.0.1:5000/staff";
      if (area) {
        apiUrl += "?area=" + encodeURIComponent(area);
      }

      // Fetches staff info from backend
      fetch(apiUrl)
        .then(response => response.json())
        .then(backendData => {
          if (backendData.length === 0) {
            document.getElementById("staffContainer").innerHTML = "<p>No staff found for this area.</p>";
            return;
          }

          // Loops through all backend staff
          backendData.forEach((extraInfo) => {
            // Creates a card for each staff member
            document.getElementById("staffContainer").innerHTML += `
              <div class="card">
                <img src="${person.picture.medium}" alt="Staff photo" />
                <h2>Name: ${person.name.first} ${person.name.last}</h2>
                <p><strong>Email:</strong> ${extraInfo.email}</p>
                <p><strong>Research Area:</strong> ${extraInfo.research_area}</p>
              </div>
            `;
          });
        });
    })
    .catch(error => console.error("Error fetching data:", error));
}

// Logs the user and backend data to console

loadStaff();  // Runs when page loads