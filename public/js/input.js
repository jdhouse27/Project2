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

            var geocoder = new google.maps.Geocoder();

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
let categoryContainer = $("#category")

$(".addCategory").on("click", function() {
    searchNow = $(this).data('id');
    console.log(searchNow);
    localStorage.setItem("searchNow", searchNow);
    const location = localStorage.getItem("location")
    showCategory({ searchNow: searchNow, location: location });
})

function showCategory(Yelp) {
    $.ajax({
        method: "POST",
        url: "/api/yelp",
        data: Yelp
    }).then(function(response) {
        console.log(response);

    });
}
// });
// //Catagories:Bars
// app.get("/api/yelp", function(req, res) {
//   yelp.search("Bars", $("#city")).then(function(yelpResponse) { res.json(yelpResponse) })
// });
// //Catagories:Restaurants
// app.get("/api/yelp", function(req, res) {
//   yelp.search("Restaurants", $("#city")).then(function(yelpResponse) { res.json(yelpResponse) })
// });
// //Catagories:Sporting Events
// app.get("/api/yelp", function(req, res) {
//   yelp.search("Sporting Events", $("#city")).then(function(yelpResponse) { res.json(yelpResponse) })
// });
// //Catagories:Museums
// app.get("/api/yelp", function(req, res) {
//   yelp.search("Museums", $("#city")).then(function(yelpResponse) { res.json(yelpResponse) })
// });
// //Catagories:Libraries
// app.get("/api/yelp", function(req, res) {
//   yelp.search("Libraries", $("#city")).then(function(yelpResponse) { res.json(yelpResponse) })
// });
// //Catagories:Shopping
// app.get("/api/yelp", function(req, res) {
//   yelp.search("Shopping", $("#city")).then(function(yelpResponse) { res.json(yelpResponse) })
// });

// });
// }