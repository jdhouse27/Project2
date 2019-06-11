$(document).ready(function() {
    // Getting references to the name input and user container, as well as the table body
    let nameInput = $("#user-name");

    // A function to handle what happens when the form is submitted to create a new User
    function handleUserFormSubmit(event) {
        event.preventDefault();
        // Don't do anything if the name fields hasn't been filled out
        if (!nameInput
            .val()
            .trim()
            .trim()
        ) {
            return;
        }
        // Calling the upsertUser function and passing in the value of the name input
        upsertUser({
            name: nameInput.val().trim()
        });
    }

    // A function for creating an user. Calls getUsers upon completion
    function upsertUser(userData) {
        $.post("/api/users", userData).then(getUsers);
    }

    // Function for retrieving users and getting them ready to be rendered to the page
    function getUsers() {
        $.get("/api/users", function(data) {
            let rowsToAdd = [];
            for (let i = 0; i < data.length; i++) {
                rowsToAdd.push(createUserRow(data[i]));
            }
            renderUserList(rowsToAdd);
            nameInput.val("");
        });
    }

    // Function for handling what to render when there are no users
    function renderEmpty() {
        //put dummy user to be loaded in here.
    }
});