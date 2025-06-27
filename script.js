document.getElementById("logNameBtn").addEventListener("click", function () {
  let name = document.getElementById("nameInput").value;
  console.log(" You entered: " + name);
  document.getElementById("nameInput").value = ""; // Clear the input field after logging
});

// Function to fetch staff data from randomuser.me
function loadStaff() {
  
  fetch("https://randomuser.me/api/")     // Fetch a random user from the API
    .then(response => response.json())    // Convert response to JSON
    .then(data => {                         
      let person = data.results[0];             // Get the first result from the API response     

        // Create a card HTML structure with the person's details
      document.getElementById("staffContainer").innerHTML += `
        <div class="card">
          <img src="${person.picture.medium}" alt="Profile picture" />
          <h2>${person.name.first} ${person.name.last}</h2>
          <p>Email: ${person.email}</p>
          <p>Location: ${person.location.city}</p>
        </div>
      `;
    })
    .catch(error => {
      console.error("Error fetching staff data:", error);
    });
}


// Load staff data when the page loads
loadStaff();