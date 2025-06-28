// Log name input
document.getElementById("logNameBtn").addEventListener("click", function () {
  let name = document.getElementById("nameInput").value;
  console.log("You entered: " + name);
});

// Fetch from RandomUser and your Flask backend, then combine them
function loadStaff() {
  // 1. Fetch random user
  fetch("https://randomuser.me/api/")
    .then(response => response.json())
    .then(userData => {
      let person = userData.results[0];

      // 2. Fetch additional staff info from Flask
      fetch("http://127.0.0.1:5000/staff")
        .then(response => response.json())
        .then(backendData => {
          
          // Using the first backend profile
          let extraInfo = backendData[0];
          console.log("Backend data:", extraInfo); //testing backend data
          // Combine both data sources into a card
          document.getElementById("staffContainer").innerHTML += `
            <div class="card">
              <img src="${person.picture.medium}" />
              <h2>${person.name.first} ${person.name.last}</h2>
              <p><strong>Email:</strong> ${extraInfo.email}</p>
              <p><strong>Research Area:</strong> ${extraInfo.research_area}</p>
              <p><strong>City:</strong> ${person.location.city}</p>
            </div>
          `;
        });
    console.log("User data:", person); //testing user data
            
      });
}

// Log the user and backend data to console

loadStaff();  // Run when page loads
