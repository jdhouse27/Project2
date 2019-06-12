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
let categoryContainer = [];
let selectedCat;

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
            categoryContainer = {
                name: data[i].name,
                address: data[i].address,
                city: data[i].city,
                rating: data[i].rating,
                price: data[i].price
            };
            data[i].latitude;
            data[i].location;
            console.log(categoryContainer);
        };
    });
}