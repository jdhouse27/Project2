$(document).ready(function() {
    // Getting references to the user information
    let user = $("#user-name");



    // A function for creating an user. Calls getUsers upon completion
    function upsertUser(userData) {
        $.post("/api/users", userData).then(getUsers);
    }


    function getUsers() {
        $.get("/api/users", function(data) {

            user.val("");
        });
    }

    // Function for handling what to render when there are no users
    function useDummy() {
        //put dummy user to be loaded in here.
    }
});