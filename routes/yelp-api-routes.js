// Dependencies
// =============================================================

// Requiring our yelp model
var db = require("../models");
var Yelp = require("../config/yelpApi.js");
// Routes
// =============================================================
module.exports = function(app) {
  //Catagories
  app.post("/api/yelp", function(req, res) {
    console.log(req.body);
    Yelp.search(req.body.searchNow, req.body.location).then(function(
      yelpResponse
    ) {
      res.json(yelpResponse);
    });
  });
};
