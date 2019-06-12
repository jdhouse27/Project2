$(document).ready(function() {
    //search for user
    let url = window.location.search;
    let userId;
    if (url.indexOf("?user_id=") !== -1) {
        userId = url.split("=")[1];
        getEvents(userId);
        console.log(userId);
    }
    // If there's no userId we use dummy user for functionality
    else {
        userId = "Home"
        getEvents(userId);
    }


    //get events associated with user login 
    function getEvents(user) {
        $("#new-event").on("click", function(events) {
            userId = user || "";
            if (userId) {
                userId = "/?user_id=" + userId;
            }
            $.get("/api/events" + userId, function(data) {
                events = data;
                location.reload();
                //consider adding if statement.  if added created displayEmpty function.
            });
        });
    };

    //remove events user no-longer wants
    $(".remove-status").on("click", function(events) {
        let id = $(this).data("id");
        // Delete event
        $.ajax({
            method: "DELETE",
            url: "/api/events/" + id
        }).then(
            function() {
                console.log("event remove");
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });
    //add new event to itinerary
    $(".create-event").on("click", function(events) {
        // Make sure to preventDefault on a submit event.
        // event.preventDefault();
        let newEvent = {
            event_name: $("#event").val().trim(),
            active: true
        };

        // Send the POST request.
        $.ajax("/api/event/", {
            type: "POST",
            data: newEvent
        }).then(
            function() {
                console.log("created new event");
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });
    //change location to new location.
    $(".location-status").on("click", function(events) {
        let newLocation = {
            eventAddress: $("#event").val().trim(),
        };

        // Send the POST request.
        $.ajax("/api/event/", {
            type: "POST",
            data: newLocation
        }).then(
            function() {
                console.log("location changed to " + newLocation);
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });

});