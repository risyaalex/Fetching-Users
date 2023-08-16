let inputSearchField = document.getElementById("searchField");
let newUserDataDisplay = document.getElementById("userDataDisplay")
let sortMessage = document.getElementById("message")
let userData = [];

let isLoading = false;

// Function to load user data from JSON link

async function loadUserData() {
  const apiEndpoint = "https://jsonplaceholder.typicode.com/users";
  try {
    const response = await fetch(apiEndpoint);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    isLoading = true;
    userData = await response.json();
      
    console.log(userData);
    console.log("Loading data...");
      
    renderUsers(userData);
    console.log("FETCHING DATA...");
  } catch (error) {
    console.error(
      "There was a problem with the fetch operation:",
      error.message
    );
  } finally {
    isLoading = false;
    renderUsers(userData);
    console.log("END OF FETCHING DATA...");
  }
}


// Function to render user data on the page

function renderUsers(users) {

    console.log("Loading data(renderUsers):", isLoading);

    newUserDataDisplay.innerHTML = "";

    console.log(`Users= ${users}`)
   
    users.map((user) => {

        newUserDataDisplay.innerHTML += `<div class="user-card">
                                        <h2>${user.name} (${user.username})</h2>
                                        <p><b>Email:</b> ${user.email}</p>
                                        <p><b>Phone:</b> ${user.phone}</p>
                                        <p><b>Website:</b> ${user.website}</p>
                                        <div class="address"><h3>Address: </h3>
                                        <p><b>Street:</b> ${user.address.street}</p>
                                        <p><b>Suite:</b> ${user.address.suite}</p>
                                        <p><b>City:</b> ${user.address.city}</p>
                                        <p><b>Zip:</b> ${user.address.zipcode}</p>
                                        </div>
                                        <div class="company">
                                        <h3>Company:</h3>
                                        <p><b>Name:</b> ${user.company.name}</p>
                                        <p><b>Catchphrase:</b> ${user.company.catchPhrase}</p>
                                        <p><b>BS:</b> ${user.company.bs}</p>
                                        </div>
                                     </div>`;
    });

    sortMessage.innerHTML = isLoading ? `<p class="message">Loading Data...</p>` : users.length === 0 ? `<p class="message">No users found or no data available...</p>` : `<p class="message">Total found: ${users.length}</p>`
}

// Function to filter and display users based on search input

function filterUsers() {
  
    const inputSearchFieldValueToLowerCase = document.getElementById("searchField").value.toLowerCase();

    console.log(inputSearchFieldValueToLowerCase);

    const filteredUsers = userData.filter(user => user.name.toLowerCase().includes(inputSearchFieldValueToLowerCase));

    console.log("Search users Name:", filteredUsers);

    renderUsers(filteredUsers);

}


// sort by name

function sortByNameDown(users) {
    inputSearchField.value = ""
    users = userData;
    let sortedUsers = users.slice().sort((a, b) => a.name.localeCompare(b.name));
    newUserDataDisplay.innerHTML = ""
    sortMessage.innerHTML = `<p class="message">Sort by Name (A to Z)</p>`; 
    renderUsers(sortedUsers);
}

function sortByNameUp(users) {
    inputSearchField.value = ""
    users = userData;
    let sortedUsers = users.slice().sort((a, b) => b.name.localeCompare(a.name));
    newUserDataDisplay.innerHTML = ""
    sortMessage.innerHTML = `<p class="message">Sort by Name (Z to A)</p>`;
    renderUsers(sortedUsers);
}
