//Grab address from input field after pressing enter
$(document).ready(function() {
  $(document).keyup(function(event) {
    localStorage.setItem("key", event.key);
    if ($("#autocomplete").is(":focus") && event.key === "Enter") {
      var address = $("#autocomplete")
        .val()
        .trim();

      localStorage.clear();
      localStorage.setItem("location", address);
      console.log(event.key);

      //get categories
      showCategory();

      // window.location.assign("/location");

      var geocoder = new google.maps.Geocoder();

      console.log(address);
      geocoder.geocode({ location: address }, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          var latitude = results[0].geometry.location.lat();
          var longitude = results[0].geometry.location.lng();
          $("#coordinates").val(latitude + ", " + longitude);
          console.log(Geocoder);
          console.log(latitude, longitude);
        }
      });
    }
  });

  function showCategory() {
    // $.get("/category", function() {
    window.location.href = "/category";
    console.log("hi");
    // });
  }
  //Yelp API call will go in here
  // function renderCategoryList() {
  // console.log("hi");
  // }
});

