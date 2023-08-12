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
                                            <p>Email: ${users[i].email}</p>
                                            <p>Phone: ${users[i].phone}</p>
                                            <p>Website: ${users[i].website}</p>
                                            <h3>Address: </h3>
                                            <p>Street: ${users[i].address.street}</p>
                                            <p>Suite: ${users[i].address.suite}</p>
                                            <p>City: ${users[i].address.city}</p>
                                            <p>Zip: ${users[i].address.zipcode}</p>
                                            <h3>Company:</h3>
                                            <p>Name: ${users[i].company.name}</p>
                                            <p>Catchphrase: ${users[i].company.catchPhrase}</p>
                                            <p>BS: ${users[i].company.bs}</p>
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
                                                    <p>Email: ${userData[i].email}</p>
                                                    <p>Phone: ${userData[i].phone}</p>
                                                    <p>Website: ${userData[i].website}</p>
                                                    <h3>Address: </h3>
                                                    <p>Street: ${userData[i].address.street}</p>
                                                    <p>Suite: ${userData[i].address.suite}</p>
                                                    <p>City: ${userData[i].address.city}</p>
                                                    <p>Zip: ${userData[i].address.zipcode}</p>
                                                    <h3>Company:</h3>
                                                    <p>Name: ${userData[i].company.name}</p>
                                                    <p>Catchphrase: ${userData[i].company.catchPhrase}</p>
                                                    <p>BS: ${userData[i].company.bs}</p>
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
