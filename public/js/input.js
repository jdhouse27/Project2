//let address;
//Grab address from input field after pressing enter
$(document).ready(function() {
   $(document).keyup(function(event) {
     localStorage.setItem("key", event.key)
       if ($("#autocomplete").is(":focus") && event.key == "Enter") {
         var address = $('#autocomplete').val().trim();
         localStorage.clear();
         localStorage.setItem("location", address);
         console.log(event.key)
         window.location.assign("category.html");

           var geocoder = new google.maps.Geocoder();

           console.log(address)
           geocoder.geocode( { 'location': address}, function(results, status) {

           if (status == google.maps.GeocoderStatus.OK) {
               var latitude = results[0].geometry.location.lat();
               var longitude = results[0].geometry.location.lng();
               $('#coordinates').val(latitude+', '+longitude);
               console.log(Geocoder);
               console.log(latitude, longitude);
               }
           });
       }
   });
 });

let searchNow;
let eventToAdd;
let resultsReturn;

$(".addCategory").on("click", function() {
    searchNow = $(this).data('id');
    console.log(searchNow);
    localStorage.setItem("searchNow", searchNow);
    const location = localStorage.getItem("location")
    findCategory({ searchNow: searchNow, location: location });
    UIkit.modal($("#catModal")).show();
})

$("#newSearchItem").keyup(function(event) {
    if ($("#newSearchItem") && event.key === "Enter") {
        searchItem = $("#newSearchItem")
            .val()
            .trim();
        console.log(searchItem);
        // locatStorage.getItem("searchNow").clear();
        localStorage.setItem("searchNow", searchItem);

        const location = localStorage.getItem("location")
        findCategory({ searchNow: searchItem, location: location });
        UIkit.modal($("#catModal")).show();
    }
});

function findCategory(Yelp) {
    $.ajax({
        method: "POST",
        url: "/api/yelp",
        data: Yelp
    }).then(function(data) {
        $("#category").empty();
        for (let i = 0; i < data.length; i++) {
            // console.log(data[i]);
            let catLat = data[i].latitude;
            let catLong = data[i].location;
            let catCategory = data[i].category;

            let newRow = $("<dl>");
            let newRowclass = ("uk-description-list uk-description-list-divider newRow" + [i]);
            newRow.addClass(newRowclass);
            newRow.attr("data-id", data[i].name);
            let catName = $("<dt>").text(data[i].name);
            let newClassName = ("addName" + [i]);
            catName.addClass(newClassName);
            // catName.attr("data-id", data[i].name);
            let catAdd = $("<dd>").text("+ " + data[i].address + ", " + data[i].city);
            catAdd.addClass("catAdd");
            // catAdd.attr("data-id", (data[i].address + ", " + data[i].city));
            let catRate = $("<dd>").text("+ Rating: " + data[i].rating);
            catRate.addClass("catRate");
            // catRate.attr("data-id", data[i].rating);
            let catPrice = $("<dd>").text("+ Price Range: " + data[i].price);
            catPrice.addClass("catPrice");
            // catPrice.attr("data-id", data[i].price);
            let line = $("<hr>");
            let createBtn = $("<button>").text("Add to Itinerary")
                // let newBtnClass = ("createEventBtn" + [i]);
            createBtn.addClass("create-event");
            createBtn.attr("data-id", ("create-event" + [i]));
            $(".uk-modal-title").text("Check out these awesome results we found for you.")

            newRow.append(catName, catAdd, catRate, catPrice, createBtn, line);

            // console.log(newRow);
            $("#category").append(newRow);
        };
    });
}


$(document).on("click", "button.create-event", function() {

    let addNow = $(this).parent().data();
    let addNewName = addNow.id;
    console.log(addNewName);
    let newAdd = $("<li>").text(addNewName);
    $("#event-group").append(newAdd);
    UIkit.modal($("#catModal")).hide();
})