let inputSearchField = document.getElementById("searchField");
let newUserDataDisplay = document.getElementById("userDataDisplay")

let isLoading = true;

// Function to load user data from JSON link

function loadUserData() {
   return fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json())
    .then(userData => {
        isLoading = false; 
        renderUsers(userData); 
        return userData;
    })
    .catch(error => {
        console.error('Error:', error);
        throw error;
    });
}

// Function to render user data on the page

function renderUsers(users) {

    userData = users;

    if (isLoading) {
        newUserDataDisplay.innerText = "Loading data...";
        console.log("Loading");
        return;
    } else if (!users) {
        newUserDataDisplay.innerText = "No users found or no data available.";
        console.log("No users found");
        return;
    }

    for (let i = 0; i < users.length; i++) {
        
       newUserDataDisplay.innerHTML += `<div class="user-card">
                                            <h2>${users[i].name} (${users[i].username})</h2>
                                            <p><b>Email:</b> ${users[i].email}</p>
                                            <p><b>Phone:</b> ${users[i].phone}</p>
                                            <p><b>Website:</b> ${users[i].website}</p>
                                            <div class="address"><h3>Address: </h3>
                                            <p><b>Street:</b> ${users[i].address.street}</p>
                                            <p><b>Suite:</b> ${users[i].address.suite}</p>
                                            <p><b>City:</b> ${users[i].address.city}</p>
                                            <p><b>Zip:</b> ${users[i].address.zipcode}</p>
                                            </div>
                                            <div class="company">
                                            <h3>Company:</h3>
                                            <p><b>Name:</b> ${users[i].company.name}</p>
                                            <p><b>Catchphrase:</b> ${users[i].company.catchPhrase}</p>
                                            <p><b>BS:</b> ${users[i].company.bs}</p>
                                            </div>
                                         </div>`;
    }
}

// Function to filter and display users based on search input

function filterUsers() {

    inputSearchFieldValueToLowerCase = inputSearchField.value.toLowerCase();
    console.log(inputSearchFieldValueToLowerCase);

    if (inputSearchFieldValueToLowerCase) {

        newUserDataDisplay.innerHTML = "";
        let usersFound = false; 

        for (let i = 0; i < userData.length; i++) {

            let userDataNameToLowerCase = userData[i].name.toLowerCase();

            if ((userDataNameToLowerCase).includes(inputSearchFieldValueToLowerCase)) {

                usersFound = true;

                console.log(userData[i].name)

                newUserDataDisplay.innerHTML += `<div class="user-card">
                                                    <h2>${userData[i].name} (${userData[i].username})</h2>
                                                    <p><b>Email:</b> ${userData[i].email}</p>
                                                    <p><b>Phone:</b> ${userData[i].phone}</p>
                                                    <p><b>Website:</b> ${userData[i].website}</p>
                                                    <h3>Address: </h3>
                                                    <p><b>Street:</b> ${userData[i].address.street}</p>
                                                    <p><b>Suite:</b> ${userData[i].address.suite}</p>
                                                    <p><b>City:</b> ${userData[i].address.city}</p>
                                                    <p><b>Zip:</b> ${userData[i].address.zipcode}</p>
                                                    <h3>Company:</h3>
                                                    <p><b>Name:</b> ${userData[i].company.name}</p>
                                                    <p><b>Catchphrase:</b> ${userData[i].company.catchPhrase}</p>
                                                    <p><b>BS:</b> ${userData[i].company.bs}</p>
                                                </div>`;
            } 

        }

        if (!usersFound) {
                newUserDataDisplay.innerHTML = `No users found or no data available.`
        } 
    } else {
        newUserDataDisplay.innerHTML = "";
        renderUsers(userData); 
    }
}
