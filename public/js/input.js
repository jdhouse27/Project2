let address;
//Grab address from input field after pressing enter
$(document).ready(function() {
    $(document).keyup(function(event) {
        localStorage.setItem("key", event.key);
        if ($("#autocomplete").is(":focus") && event.key === "Enter") {
            address = $("#autocomplete")
                .val()
                .trim();

            localStorage.clear();
            localStorage.setItem("location", address);
            console.log(event.key);

            window.location.href = "/category";

            let geocoder = new google.maps.Geocoder();

            geocoder.geocode({ location: address }, function(results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    console.log(results);
                    var latitude = results[0].geometry.location.lat();
                    var longitude = results[0].geometry.location.lng();
                    $("#coordinates").val(latitude + ", " + longitude);
                    console.log(latitude, longitude);
                }
            });
        }
    });
});

let searchNow;

$(".addCategory").on("click", function() {
    searchNow = $(this).data('id');
    console.log(searchNow);
    localStorage.setItem("searchNow", searchNow);
    const location = localStorage.getItem("location")
    findCategory({ searchNow: searchNow, location: location });
})

function findCategory(Yelp) {
    $.ajax({
        method: "POST",
        url: "/api/yelp",
        data: Yelp
    }).then(function(data) {
        for (let i = 0; i < data.length; i++) {
            // console.log(data[i]);

            let city = data[i].city;

            let catLat = data[i].latitude;
            let catLong = data[i].location;

            let category = $("<div>");

            let row = $("<dl>");
            row.addClass("uk-description-list uk-description-list-divider");
            let catName = $("<dt>").text(data[i].name);
            let catAdd = $("<dd>").text(data[i].address);
            let catRate = $("<dd>").text("Rating: " + data[i].rating);
            let catPrice = $("<dd>").text("Price Range: " + data[i].price);
            let createBtn = $("<button>").text("Add to Itinerary")

            row.append(catName, catAdd, catRate, catPrice, createBtn);
            console.log(row);
            $("#category").append(row);
        };

    });
}

// function addCategory (catContainer) {

//     for (let i = 0; i < data.length; i++) {
//         console.log(data[i]);

//         }
// }

// console.log(categoryContainer);
// $("#category").append(categoryContainer);

// let newSelectCat = $("<dl>");
// newSelectCat.addClass("uk-description-list uk-description-list-divider");
// let newSelectName = $("<dt>");
// newSelectName.addId("catName");
// let newSelectAdd = $("<dd>");
// newSelectAdd.addId("catAdd");
// let newSelectRate = $("<dt>");
// newSelectRate.addId("catRate");
// let newSelectPrice = $("<dd>");
// newSelectPrice.addId("catPrice");
// let addBtn = $("<button>");
// addBtn.text("Add to Itinerary");
// addBtn.addClass("create-event");
// return ;